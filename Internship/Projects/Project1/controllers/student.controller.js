const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/helperFuntion");
const { EmailVerificationToken, verifyToken, generateResetPasswordToken } = require("../utils/generate.token");
const fs = require("fs");
const path = require("path");


//create API
const createStudent = async (req, res) => {
    let studentId = null;

    try {
        const {
            firstName, lastName, email, password,
            age, gender, phone, pan, adhar, address, country, hobbies, dob
        } = req.body;

        //Handle Image Upload
        const imagePath = req.file
            ? "/uploads/images/profile/" + req.file.filename
            : "/uploads/default.png";
        uploadedImage = req.file ? req.file.filename : null;
        // 1 hobbies logic
        let processedHobbies = [];
        if (hobbies) {
            processedHobbies = [
                ...new Set(hobbies.split(",").map(h => h.trim()).filter(h => h))
            ];
        }

        // 2 Create instances (NOT saving yet)
        const student = new Student({
            firstName,
            lastName,
            email,
            password
        });

        const detail = new StudentDetail({
            student: student._id, // temporary reference
            age,
            gender,
            phone,
            pan,
            adhar,
            address,
            country,
            hobbies: processedHobbies,
            dob,
            image: imagePath
        });

        //3 Validate BOTH;
        let errors = {};

        try {
            await student.validate();
        } catch (err) {
            if (err.name === "ValidationError") {
                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                });
            } else {
                throw err;
            }
        }

        try {
            await detail.validate();
        } catch (err) {
            if (err.name === "ValidationError") {
                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                });
            } else {
                throw err;
            }
        }

        // 4 If any validation error → return immediately
        if (Object.keys(errors).length > 0) {

            // delete uploaded image if validation fails
            if (uploadedImage) {
                const filePath = path.join(__dirname, "..", "uploads", "images","profile", uploadedImage);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            return res.render("register", {
                errors,
                data: req.body,
                success: false
            });
        }

        // 5 hashing password after validation passes
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);

        // 6 Save both
        await student.save();
        studentId = student._id;

        const verificationToken = EmailVerificationToken(student._id);

        student.verificationToken = verificationToken;
        student.verificationTokenExpiry = Date.now() + 10 * 60 * 1000; // means 10 mins

        await student.save();
        await detail.save();

        const verificationLink = `http://localhost:4000/students/verify-email?token=${verificationToken}`;
        await sendMail({
            email: email,
            subject: "Verify Your Email",
            content: `
        <h2>Hello ${firstName},</h2>
        <p>Please click the button below to verify your email:</p>
        
        <a href="${verificationLink}" 
           style="display:inline-block;
                  padding:10px 20px;
                  background-color:#2563eb;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:5px;">
            Verify Email
        </a>

        <p>This link will expire in 1 minutes.</p>
    `
        });

        return res.redirect("/students/login?type=verificationEmailSend");

    } catch (err) {
        console.error("❌ Registration Error:", err);
        console.log("Duplicate Key Pattern:", err.keyPattern);
        console.log("Duplicate Key Value:", err.keyValue);

        let errors = {};

        // Duplicate errors
        if (err.code === 11000) {
            const keys = err.keyPattern || {};
            if (keys.email) errors.email = "This email is already registered.";
            else if (keys.pan) errors.pan = "This PAN number is already registered.";
            else if (keys.adhar) errors.adhar = "This Adhar number is already registered.";
            else if (keys.phone) errors.phone = "This phone number is already registered.";
            else errors.general = "Duplicate data found.";
        } else {
            errors.general = "Something went wrong: " + err.message;
        }

        // Rollback if student already saved
        if (studentId) {
            await Student.findByIdAndDelete(studentId);
        }
        // Delete uploaded image if registration fails
        if (uploadedImage) {

           const filePath = path.join(__dirname, "..", "uploads", "images","profile", uploadedImage);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        return res.render("register", {
            errors,
            data: req.body,
            success: false
        });
    }
};
//update API
const updateProfile = async (req, res) => {
    const paramId = req.params.id;
    const loggedInId = req.user._id.toString();

    // 1. Authorization Check
    if (!req.user.isAdmin && paramId !== loggedInId) {
        return res.redirect("/students/profile?type=Unauthorized");
    }

    try {
        // --- ADDED THIS LINE TO GET STUDENT EMAIL ---
        const targetStudent = await Student.findById(paramId);
        if (!targetStudent) return res.redirect("/students/profile?type=NotFound");
        const existingDetail = await StudentDetail.findOne({ student: paramId });
        const {
            firstName, lastName, age, gender, phone, pan, adhar,
            address, country, hobbies, dob, removeImage
        } = req.body;

        const errors = {};

        // 2. Manual Uniqueness Checks
        if (phone) {
            const existingPhone = await StudentDetail.findOne({ phone, student: { $ne: paramId } });
            if (existingPhone) errors.phone = "Phone number already in use.";
        }
        if (pan) {
            const existingPan = await StudentDetail.findOne({ pan: pan.toUpperCase(), student: { $ne: paramId } });
            if (existingPan) errors.pan = "PAN number already registered.";
        }
        if (adhar) {
            const existingAdhar = await StudentDetail.findOne({ adhar, student: { $ne: paramId } });
            if (existingAdhar) errors.adhar = "Adhar number already registered.";
        }

        // Helper function
        const renderWithError = (errorObj) => {
            return res.render("editProfile", {
                student: {
                    _id: paramId,
                    email: targetStudent.email, // <--- CHANGED THIS
                    firstName, lastName, age, gender, phone, pan, adhar, address, country, dob, image: existingDetail?.image,
                    hobbies: hobbies ? (typeof hobbies === 'string' ? hobbies.split(",").map(h => h.trim()) : hobbies) : []
                },
                errors: errorObj
            });
        };

        if (Object.keys(errors).length > 0) {
            return renderWithError(errors);
        }

        // 3. Build Updates
        const basicUpdate = {};
        if (firstName) basicUpdate.firstName = firstName;
        if (lastName) basicUpdate.lastName = lastName;

        const detailUpdate = {};
        if (age) detailUpdate.age = age;
        if (gender) detailUpdate.gender = gender;
        if (phone) detailUpdate.phone = phone;
        if (pan) detailUpdate.pan = pan.toUpperCase();
        if (adhar) detailUpdate.adhar = adhar;
        if (address) detailUpdate.address = address;
        if (country) detailUpdate.country = country;
        if (dob) detailUpdate.dob = dob;

        if (hobbies) {
            detailUpdate.hobbies = [...new Set(hobbies.split(",").map(h => h.trim()).filter(Boolean))];
        }
        // Remove image
        if (removeImage === "true") {

            if (existingDetail?.image && existingDetail.image !== "/uploads/default.png") {

                const oldPath = path.join(__dirname, "..", existingDetail.image);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            detailUpdate.image = "/uploads/default.png";
        }

        // Upload new image
        if (req.file) {

            // delete old image if exists
            if (existingDetail?.image && existingDetail.image !== "/uploads/default.png") {

                const oldPath = path.join(__dirname, "..", existingDetail.image);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            detailUpdate.image = "/uploads/images/profile/" + req.file.filename;
        }

        // 4. Update Database
        if (Object.keys(basicUpdate).length > 0) {
            await Student.findByIdAndUpdate(paramId, basicUpdate, { new: true, runValidators: true, context: 'query' });
        }

        if (Object.keys(detailUpdate).length > 0) {
            await StudentDetail.findOneAndUpdate({ student: paramId }, detailUpdate, { new: true, upsert: true, runValidators: true, context: 'query' });
        }

        if (req.user.isAdmin && paramId !== loggedInId) {
            return res.redirect("/students/admin/dashboard");
        }
        return res.redirect("/students/profile?type=updateSuccess");

    } catch (error) {
        console.error("Update Error:", error);
        const catchErrors = {};

        // --- FETCH STUDENT AGAIN FOR CATCH BLOCK ---
        const targetStudent = await Student.findById(paramId);
        const existingDetail = await StudentDetail.findOne({ student: paramId });
        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                catchErrors[key] = error.errors[key].message;
            });

            return res.render("editProfile", {
                student: {
                    _id: paramId,
                    email: targetStudent.email, // <--- CHANGED THIS
                    ...req.body,
                    image: existingDetail?.image,
                    hobbies: req.body.hobbies ? (typeof req.body.hobbies === 'string' ? req.body.hobbies.split(',').map(h => h.trim()) : req.body.hobbies) : []
                },
                errors: catchErrors
            });
        }

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            catchErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is already registered.`;

            return res.render("editProfile", {
                student: { _id: paramId, email: targetStudent.email, ...req.body }, // <--- CHANGED THIS
                errors: catchErrors
            });
        }

        return res.redirect("/students/profile?type=updateError");
    }
};
// const updateProfile = async (req, res) => {
//     try {
//         const paramId = req.params.id;
//         const loggedInId = req.user._id.toString();

//         console.log("Is Admin:", req.user.isAdmin)
//         console.log("Param ID:", paramId);
//         console.log("Logged ID:", loggedInId);
//         if (!req.user.isAdmin && paramId !== loggedInId) {// main logic for updating data in the dashboard.
//             //return res.status(403).send("Unauthorized update"); 
//             return res.redirect("/students/profile?type=Unauthorized");
//         };
//         const {
//             firstName, lastName,
//             age, gender, phone, pan, adhar,
//             address, country, hobbies, dob
//         } = req.body;

//         let processedHobbies;
//         if (hobbies) {
//             processedHobbies = [
//                 ...new Set(hobbies.split(",").map(h => h.trim()).filter(Boolean))
//             ];
//         }

//         // ✅ Only update provided fields
//         const basicUpdate = {};
//         if (firstName) basicUpdate.firstName = firstName;
//         if (lastName) basicUpdate.lastName = lastName;

//         await Student.findByIdAndUpdate(paramId, basicUpdate);

//         const detailUpdate = {};
//         if (age) detailUpdate.age = age;
//         if (gender) detailUpdate.gender = gender;
//         if (phone) detailUpdate.phone = phone;
//         if (pan) detailUpdate.pan = pan;
//         if (adhar) detailUpdate.adhar = adhar;
//         if (address) detailUpdate.address = address;
//         if (country) detailUpdate.country = country;
//         if (processedHobbies) detailUpdate.hobbies = processedHobbies;
//         if (dob) detailUpdate.dob = dob;

//         await StudentDetail.findOneAndUpdate(
//             { student: paramId },
//             detailUpdate,
//             { new: true }
//         );
//         if (req.user.isAdmin && paramId !== loggedInId) {
//             return res.redirect("/students/admin/dashboard");
//         }
//         return res.redirect("/students/profile?type=updateSuccess");

//     } catch (error) {
//         console.error("Update Error:", error);
//         //return res.status(500).send("Update failed.");
//         return res.redirect("/students/profile?type=updateError");
//     }
// };

// delete API
const deleteStudent = async (req, res) => {
    try {
        const paramId = req.params.id;
        const loggedInId = req.user._id.toString();

        //Only admin should reach here
        if (!req.user.isAdmin) {
            return res.redirect("/students/profile?type=adminRequired");
        }

        //Prevent admin from deleting himself
        if (paramId === loggedInId) {
            return res.redirect("/students/admin/dashboard");
        }

        await Student.findByIdAndDelete(paramId);
        await StudentDetail.findOneAndDelete({ student: paramId });

        //return res.redirect("/students/admin/dashboard?deleted=true");
        return res.redirect("/students/admin/dashboard?type=studentDeleted");


    } catch (error) {
        console.error("Delete Error:", error);
        return res.redirect("/students/admin/dashboard?type=DeleteError");
        // return res.redirect("/students/admin/dashboard");
    }
};

module.exports = { createStudent, updateProfile, deleteStudent };
