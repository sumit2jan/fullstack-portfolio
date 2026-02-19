const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");


//create API
const createStudent = async (req, res) => {
    let studentId = null;

    try {
        const {
            firstName, lastName, email, password,
            age, gender, phone, pan, adhar, address, country, hobbies, dob
        } = req.body;

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
            dob
        });

        // 3 Validate BOTH
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

        await detail.save();

        // return res.render("register", {
        //     success: true,
        //     errors: {},
        //     data: {}
        // });
        return res.redirect("/students/login?type=registerSuccess");

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

        return res.render("register", {
            errors,
            data: req.body,
            success: false
        });
    }
};
//update API
const updateProfile = async (req, res) => {
    try {
        const paramId = req.params.id;
        const loggedInId = req.user._id.toString();

        console.log("Is Admin:", req.user.isAdmin)
        console.log("Param ID:", paramId);
        console.log("Logged ID:", loggedInId);
        if (!req.user.isAdmin && paramId !== loggedInId) {
            return res.status(403).send("Unauthorized update"); // main logic for updating data in the dashboard.
        }
        ;
        const {
            firstName, lastName,
            age, gender, phone, pan, adhar,
            address, country, hobbies, dob
        } = req.body;

        let processedHobbies;
        if (hobbies) {
            processedHobbies = [
                ...new Set(hobbies.split(",").map(h => h.trim()).filter(Boolean))
            ];
        }

        // ✅ Only update provided fields
        const basicUpdate = {};
        if (firstName) basicUpdate.firstName = firstName;
        if (lastName) basicUpdate.lastName = lastName;

        await Student.findByIdAndUpdate(paramId, basicUpdate);

        const detailUpdate = {};
        if (age) detailUpdate.age = age;
        if (gender) detailUpdate.gender = gender;
        if (phone) detailUpdate.phone = phone;
        if (pan) detailUpdate.pan = pan;
        if (adhar) detailUpdate.adhar = adhar;
        if (address) detailUpdate.address = address;
        if (country) detailUpdate.country = country;
        if (processedHobbies) detailUpdate.hobbies = processedHobbies;
        if (dob) detailUpdate.dob = dob;

        await StudentDetail.findOneAndUpdate(
            { student: paramId },
            detailUpdate,
            { new: true }
        );
        if (req.user.isAdmin && paramId !== loggedInId) {
            return res.redirect("/students/admin/dashboard");
        }
        return res.redirect("/students/profile?type=updateSuccess");

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).send("Update failed.");
    }
};
module.exports = { createStudent, updateProfile };

// const updateProfile = async (req, res) => {
//     try {
//         const {
//             firstName, lastName,
//             age, gender, phone, pan, adhar,
//             address, country, hobbies, dob
//         } = req.body;

//         const studentId = req.user._id;

//         let processedHobbies = [];
//         if (hobbies) {
//             processedHobbies = [
//                 ...new Set(hobbies.split(",").map(h => h.trim()).filter(h => h))
//             ];
//         }

//         // Update basic student
//         await Student.findByIdAndUpdate(studentId, {
//             firstName,
//             lastName
//         });

//         // Update details
//         await StudentDetail.findOneAndUpdate(
//             { student: studentId },
//             {
//                 age,
//                 gender,
//                 phone,
//                 pan,
//                 adhar,
//                 address,
//                 country,
//                 hobbies: processedHobbies,
//                 dob
//             }
//         );

//         return res.redirect("/students/profile");

//     } catch (error) {
//         console.error("Update Error:", error);
//         res.status(500).send("Update failed.");
//     }
// };

// get all student
// const getStudents = async (req, res) => {
//     try {
//         const students = await StudentDetail.find({}).populate("student");
//         if (students.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 data: null,
//                 message: "No student found"
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "All students fetched successfully",
//             data: students
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             data: null,
//             message: "Error fetching students",
//             error: error.message
//         });
//     }
// };


//  POST: In this i am not able to handle the error in once

// const createStudent = async (req, res) => {
//     let studentId = null;

//     try {
//         const {
//             firstName, lastName, email, password,
//             age, gender, phone, pan, adhar, address, country, hobbies, dob
//         } = req.body;

//         // 1.HOBBIES LOGIC
//         let processedHobbies = [];
//         if (hobbies) {
//             processedHobbies = [
//                 ...new Set(hobbies.split(",").map(h => h.trim()).filter(h => h))
//             ];
//         }

//         /// First create student WITHOUT hashing
//         const student = new Student({
//             firstName,
//             lastName,
//             email,
//             password
//         });

//         // Validate manually before hashing
//         await student.validate();

//         // Now hash
//         const salt = await bcrypt.genSalt(10);
//         student.password = await bcrypt.hash(password, salt);

//         // Save after hashing
//         await student.save();
//         studentId = student._id;

//         // 4.CREATE DETAILS
//         try {
//             await StudentDetail.create({
//                 student: student._id,
//                 age, gender, address, country,
//                 hobbies: processedHobbies, // Sending the array
//                 phone, dob, pan, adhar,
//             });

//             // Success!
//             return res.render("register", {
//                 success: true,
//                 errors: {},
//                 data: {}
//             });

//         } catch (detailError) {
//             // 5.ROLLBACK LOGIC
//             await Student.findByIdAndDelete(studentId);
//             throw detailError; // Bubble up to main error handler
//         }

//     } catch (err) {
//         console.error("❌ Registration Error:", err);
//         let errors = {};

//         // Handle Mongoose Validation (Replaces your manual if checks)
//         if (err.name === "ValidationError") {
//             Object.keys(err.errors).forEach((key) => {
//                 errors[key] = err.errors[key].message;
//             });
//         }
//         // Handle Duplicates (Replaces your manual findOne check)
//         else if (err.code === 11000) {
//             const keys = err.keyPattern || {};
//             if (keys.email) errors.email = "This email is already registered.";
//             else if (keys.pan) errors.pan = "This PAN number is already registered.";
//             else if (keys.adhar) errors.adhar = "This Adhar number is already registered.";
//             else if (keys.phone) errors.phone = "This phone number is already registered.";
//             else errors.general = "Duplicate data found.";
//         }
//         else {
//             errors.general = "Something went wrong: " + err.message;
//         }

//         return res.render("register", {
//             errors: errors,
//             data: req.body,
//             success: false
//         });
//     }
// };