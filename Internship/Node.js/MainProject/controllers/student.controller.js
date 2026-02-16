const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");

// createStudent = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             age,
//             gender,
//             phone,
//             pan,
//             adhar,
//             address,
//             country,
//             hobbies,
//             dob,
//         } = req.body;

//         if (!firstName || !password || !email) {
//             return res.status(400).json({
//                 success: false,
//                 message: "First name, Email and Password are required.",
//             });
//         }

//         const existingStudent = await Student.findOne({ email });
//         if (existingStudent) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Email already registered.",
//             });
//         }

//         // Convert hobbies string into array
//         if (hobbies) {
//             hobbies = [
//                 ...new Set(
//                     hobbies
//                         .split(",")          // split by comma
//                         .map(h => h.trim())  // remove spaces
//                         .filter(h => h)      // remove empty values
//                 )
//             ];
//         } else {
//             hobbies = [];
//         }

//         if (!hobbies || hobbies.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "At least one hobby is required",
//             });
//         }


//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create Student 
//         const student = await Student.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//         });

//         try {
//             //Create StudentDetail
//             const studentDetail = await StudentDetail.create({
//                 student: student._id,
//                 age,
//                 gender,
//                 address,
//                 country,
//                 hobbies,
//                 phone,
//                 dob,
//                 pan,
//                 adhar,
//             });

//             return res.status(201).json({
//                 success: true,
//                 message: "Student created successfully",
//                 data: {
//                     student,
//                     studentDetail,
//                 },
//             });

//         } catch (detailError) {

//             //Manual rollback
//             await Student.findByIdAndDelete(student._id);

//             return res.status(400).json({
//                 success: false,
//                 message: "Student detail creation failed. Student rolled back.",
//                 error: detailError.message,
//             });
//         }

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Error creating Student",
//             error: error.message,
//         });
//     }
// };

// get all students 

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

// const getStudent = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const studentDetail = await StudentDetail
//             .findOne({ student: id })
//             .populate("student");

//         if (!studentDetail) {
//             return res.status(404).json({
//                 success: false,
//                 data: null,
//                 message: "Student not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Student data fetched successfully",
//             data: { studentDetail }
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             data: null,
//             message: "Error fetching user",
//             error: error.message
//         });
//     }
// };

// 1. GET: Show the Registration Form

const getRegisterForm = (req, res) => {
    res.render("register", {
        errors: {},
        data: {}, // Empty object for initial load
        success: false
    });
};

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

        return res.render("register", {
            success: true,
            errors: {},
            data: {}
        });

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

module.exports = { createStudent, getRegisterForm };
