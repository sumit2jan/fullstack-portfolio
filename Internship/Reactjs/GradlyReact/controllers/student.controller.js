const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/helperFuntion");
const { EmailVerificationToken, verifyToken, generateResetPasswordToken } = require("../utils/generate.token");
const fs = require("fs");
const path = require("path");


//create API React Ready
const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (
            !firstName?.trim() ||
            !lastName?.trim() ||
            !email?.trim() ||
            !password?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            });
        }

        const existingStudent = await Student.findOne({
            email: email.toLowerCase()
        });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
                data: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // yha pe time set hoga 

        let student;

        try {
            student = await Student.create({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
                otp: hashedOtp,
                otpExpiry,
                isVerified: false
            });
            await sendMail({
                email: email,
                subject: "OTP Verification",
                content: `
                    <h2>Hello ${firstName},</h2>
                    <p>Your OTP for email verification is:</p>
                    
                    <h1 style="color:#2563eb;">${otp}</h1>
                    
                    <p>This OTP will expire in 5 minutes.</p>
                `
            });

        } catch (mailError) {

            console.log(mailError);
            //Rollback if email fails
            if (student) {
                await Student.deleteOne({ _id: student._id });
            }

            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email. Please try again.",
                data: null,
                error: mailError.message
            });
        }
        const studentResponse = student.toObject();
        delete studentResponse.password;
        delete studentResponse.otp;

        // Success response
        return res.status(201).json({
            success: true,
            message: "Student registered successfully. OTP sent to email.",
            data: studentResponse
        });

    } catch (err) {
        console.log("Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error creating student",
            data: null,
            error: err.message
        });
    }
};

// const createStudent = async (req, res) => {
//     try {

//         const {
//             firstName, lastName, email, password
//         } = req.body;

//         if (
//             !firstName?.trim() ||
//             !lastName?.trim() ||
//             !email?.trim() ||
//             !password?.trim()
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//                 data: null
//             });
//         }
//         // i will use this multer later when i setup all the crud operations and all other things.

//         //Handle Image Upload
//         // const imagePath = req.file
//         //     ? "/uploads/images/profile/" + req.file.filename
//         //     : "/uploads/default.png";
//         // uploadedImage = req.file ? req.file.filename : null;

//         // 2 Create instances (NOT saving yet)

//         const existingStudent = await Student.findOne({ email: email.toLowerCase() });
//         if (existingStudent) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already registered",
//                 data: null
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // creating otp
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const hashedOtp = await bcrypt.hash(otp, 10);

//         //otp only valid for 5 mins
//         const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

//         const student = await Student.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             otp: hashedOtp,
//             otpExpiry: otpExpiry,
//             isVerified: false
//         });



//         // nodemailer logic is now going to be commented because we are going to update it with the otp 
//         await sendMail({
//             email: email,
//             subject: "OTP Verification",
//             content: `
//                 <h2>Hello ${firstName},</h2>
//                 <p>Your OTP is:</p>
//                 <h1>${otp}</h1>
//                 <p>Valid for 5 minutes</p>
//             `
//         });

//         const studentResponse = student.toObject();
//         delete studentResponse.password;
//         delete studentResponse.otp;

//         res.status(201).json({
//             success: true,
//             message: "Student created Successfully",
//             data: studentResponse
//         })

//     } catch (err) {
//         // Delete uploaded image path if registration fails
//         // if (uploadedImage) {

//         //    const filePath = path.join(__dirname, "..", "uploads", "images","profile", uploadedImage);

//         //     if (fs.existsSync(filePath)) {
//         //         fs.unlinkSync(filePath);
//         //     }
//         // }
//         console.log("Error", err)
//         return res.status(500).json({
//             success: false,
//             message: "error creating the student",
//             data: null,
//             error: err.message
//         });
//     }
// };

const updateProfile = async (req, res) => {
    try {
        const paramId = req.params.id;
        const loggedInId = req.user._id.toString();

        // console.log(paramId);
        // console.log(loggedInId);

        // 1 Authorization
        if (!req.user.isAdmin && paramId !== loggedInId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
                data: null
            });
        }

        // 2 Get existing data
        const student = await Student.findById(paramId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
                data: null
            });
        }

        const existingDetail = await StudentDetail.findOne({ student: paramId });

        const {
            firstName, lastName,
            age, gender, phone, pan, adhar,
            address, country, hobbies, dob,
            removeImage
        } = req.body;

        let errors = {};

        // 3 Uniqueness checks
        if (phone) {
            const existingPhone = await StudentDetail.findOne({
                phone,
                student: { $ne: paramId }
            });
            if (existingPhone) errors.phone = "Phone already in use";
        }

        if (pan) {
            const existingPan = await StudentDetail.findOne({
                pan: pan.toUpperCase(),
                student: { $ne: paramId }
            });
            if (existingPan) errors.pan = "PAN already exists";
        }

        if (adhar) {
            const existingAdhar = await StudentDetail.findOne({
                adhar,
                student: { $ne: paramId }
            });
            if (existingAdhar) errors.adhar = "Adhar already exists";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            });
        }

        // 4️⃣ Prepare updates
        let basicUpdate = {};
        if (firstName !== undefined) basicUpdate.firstName = firstName;
        if (lastName !== undefined) basicUpdate.lastName = lastName;

        let detailUpdate = {};
        if (age !== undefined) detailUpdate.age = age;
        if (gender !== undefined) detailUpdate.gender = gender;
        if (phone !== undefined) detailUpdate.phone = phone;
        if (pan !== undefined) detailUpdate.pan = pan.toUpperCase();
        if (adhar !== undefined) detailUpdate.adhar = adhar;
        if (address !== undefined) detailUpdate.address = address;
        if (country !== undefined) detailUpdate.country = country;
        if (dob !== undefined) detailUpdate.dob = dob;

        if (hobbies) {
            detailUpdate.hobbies = [
                ...new Set(
                    hobbies.split(",").map(h => h.trim()).filter(Boolean)
                )
            ];
        }

        // 5️⃣ Remove image
        if (removeImage === "true") {
            if (
                existingDetail?.image &&
                existingDetail.image !== "/uploads/default.png"
            ) {
                const oldPath = path.join(__dirname, "..", existingDetail.image);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            detailUpdate.image = "/uploads/default.png";
        }

        // 6️⃣ Upload new image
        if (req.file) {
            if (
                existingDetail?.image &&
                existingDetail.image !== "/uploads/default.png"
            ) {
                const oldPath = path.join(__dirname, "..", existingDetail.image);

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            detailUpdate.image = "/uploads/images/profile/" + req.file.filename;
        }

        // 7️⃣ Update DB
        let updatedStudent = null;
        let updatedDetail = null;

        if (Object.keys(basicUpdate).length > 0) {
            updatedStudent = await Student.findByIdAndUpdate(
                paramId,
                basicUpdate,
                { new: true, runValidators: true }
            );
        }

        if (Object.keys(detailUpdate).length > 0) {
            updatedDetail = await StudentDetail.findOneAndUpdate(
                { student: paramId },
                detailUpdate,
                { new: true, upsert: true, runValidators: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                student: updatedStudent,
                details: updatedDetail
            }
        });

    } catch (error) {
        console.error("Update Error:", error);

        // mongoose validation
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        // duplicate key
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }

        return res.status(500).json({
            success: false,
            data: null,
            message: "Server error"
        });
    }
};
//update API

// const updateProfile = async (req, res) => {
//     const paramId = req.params.id;
//     const loggedInId = req.user._id.toString();

//     // 1. Authorization Check
//     if (!req.user.isAdmin && paramId !== loggedInId) {
//         return res.redirect("/students/profile?type=Unauthorized");
//     }

//     try {
//         // --- ADDED THIS LINE TO GET STUDENT EMAIL ---
//         const targetStudent = await Student.findById(paramId);
//         if (!targetStudent) return res.redirect("/students/profile?type=NotFound");
//         const existingDetail = await StudentDetail.findOne({ student: paramId });
//         const {
//             firstName, lastName, age, gender, phone, pan, adhar,
//             address, country, hobbies, dob, removeImage
//         } = req.body;

//         const errors = {};

//         // 2. Manual Uniqueness Checks
//         if (phone) {
//             const existingPhone = await StudentDetail.findOne({ phone, student: { $ne: paramId } });
//             if (existingPhone) errors.phone = "Phone number already in use.";
//         }
//         if (pan) {
//             const existingPan = await StudentDetail.findOne({ pan: pan.toUpperCase(), student: { $ne: paramId } });
//             if (existingPan) errors.pan = "PAN number already registered.";
//         }
//         if (adhar) {
//             const existingAdhar = await StudentDetail.findOne({ adhar, student: { $ne: paramId } });
//             if (existingAdhar) errors.adhar = "Adhar number already registered.";
//         }

//         // Helper function
//         const renderWithError = (errorObj) => {
//             return res.render("editProfile", {
//                 student: {
//                     _id: paramId,
//                     email: targetStudent.email, // <--- CHANGED THIS
//                     firstName, lastName, age, gender, phone, pan, adhar, address, country, dob, image: existingDetail?.image,
//                     hobbies: hobbies ? (typeof hobbies === 'string' ? hobbies.split(",").map(h => h.trim()) : hobbies) : []
//                 },
//                 errors: errorObj
//             });
//         };

//         if (Object.keys(errors).length > 0) {
//             return renderWithError(errors);
//         }

//         // 3. Build Updates
//         const basicUpdate = {};
//         if (firstName) basicUpdate.firstName = firstName;
//         if (lastName) basicUpdate.lastName = lastName;

//         const detailUpdate = {};
//         if (age) detailUpdate.age = age;
//         if (gender) detailUpdate.gender = gender;
//         if (phone) detailUpdate.phone = phone;
//         if (pan) detailUpdate.pan = pan.toUpperCase();
//         if (adhar) detailUpdate.adhar = adhar;
//         if (address) detailUpdate.address = address;
//         if (country) detailUpdate.country = country;
//         if (dob) detailUpdate.dob = dob;

//         if (hobbies) {
//             detailUpdate.hobbies = [...new Set(hobbies.split(",").map(h => h.trim()).filter(Boolean))];
//         }
//         // Remove image
//         if (removeImage === "true") {

//             if (existingDetail?.image && existingDetail.image !== "/uploads/default.png") {

//                 const oldPath = path.join(__dirname, "..", existingDetail.image);

//                 if (fs.existsSync(oldPath)) {
//                     fs.unlinkSync(oldPath);
//                 }
//             }

//             detailUpdate.image = "/uploads/default.png";
//         }

//         // Upload new image
//         if (req.file) {

//             // delete old image if exists
//             if (existingDetail?.image && existingDetail.image !== "/uploads/default.png") {

//                 const oldPath = path.join(__dirname, "..", existingDetail.image);

//                 if (fs.existsSync(oldPath)) {
//                     fs.unlinkSync(oldPath);
//                 }
//             }

//             detailUpdate.image = "/uploads/images/profile/" + req.file.filename;
//         }

//         // 4. Update Database
//         if (Object.keys(basicUpdate).length > 0) {
//             await Student.findByIdAndUpdate(paramId, basicUpdate, { new: true, runValidators: true, context: 'query' });
//         }

//         if (Object.keys(detailUpdate).length > 0) {
//             await StudentDetail.findOneAndUpdate({ student: paramId }, detailUpdate, { new: true, upsert: true, runValidators: true, context: 'query' });
//         }

//         if (req.user.isAdmin && paramId !== loggedInId) {
//             return res.redirect("/students/admin/dashboard");
//         }
//         return res.redirect("/students/profile?type=updateSuccess");

//     } catch (error) {
//         console.error("Update Error:", error);
//         const catchErrors = {};

//         // --- FETCH STUDENT AGAIN FOR CATCH BLOCK ---
//         const targetStudent = await Student.findById(paramId);
//         const existingDetail = await StudentDetail.findOne({ student: paramId });
//         if (error.name === 'ValidationError') {
//             Object.keys(error.errors).forEach((key) => {
//                 catchErrors[key] = error.errors[key].message;
//             });

//             return res.render("editProfile", {
//                 student: {
//                     _id: paramId,
//                     email: targetStudent.email, // <--- CHANGED THIS
//                     ...req.body,
//                     image: existingDetail?.image,
//                     hobbies: req.body.hobbies ? (typeof req.body.hobbies === 'string' ? req.body.hobbies.split(',').map(h => h.trim()) : req.body.hobbies) : []
//                 },
//                 errors: catchErrors
//             });
//         }

//         if (error.code === 11000) {
//             const field = Object.keys(error.keyValue)[0];
//             catchErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is already registered.`;

//             return res.render("editProfile", {
//                 student: { _id: paramId, email: targetStudent.email, ...req.body }, // <--- CHANGED THIS
//                 errors: catchErrors
//             });
//         }

//         return res.redirect("/students/profile?type=updateError");
//     }
// };

// delete API
const deleteStudent = async (req, res) => {
    try {
        const paramId = req.params.id;
        const loggedInId = req.user._id.toString();

        // console.log("PARAM ID:", req.params.id);
        // console.log("USER:", req.user);

        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
                data: null
            });
        }

        if (paramId === loggedInId) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot delete himself",
                data: null
            });
        }

        const student = await Student.findById(paramId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
                data: null
            });
        }

        await Student.findByIdAndDelete(paramId);
        await StudentDetail.findOneAndDelete({ student: paramId });

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: null
        });

    } catch (error) {
        console.error("Delete Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error deleting student",
            error: error.message,
            data: null
        });
    }
};

// to fetch the data in update form 
const getSingleStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Student fetch
        const student = await Student.findById(id).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // 2️⃣ Student Detail fetch
        const detail = await StudentDetail.findOne({ student: id });

        // 3️⃣ Merge data
        const mergedData = {
            ...student.toObject(),
            ...(detail ? detail.toObject() : {}),
            studentId: student._id,
            detailId: detail?._id
        };

        // 4️⃣ Clean unwanted fields
        delete mergedData.__v;
        delete mergedData.student;

        return res.status(200).json({
            success: true,
            message: "Student fetched successfully",
            data: mergedData
        });

    } catch (error) {
        console.log("Get Single Student Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            data: null
        });
    }
};

module.exports = { createStudent, updateProfile, deleteStudent, getSingleStudent };
