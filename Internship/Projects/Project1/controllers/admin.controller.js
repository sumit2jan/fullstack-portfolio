const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");

// const getAllStudents = async (req, res) => {
//     try {
//         const students = await Student.find().select("-password");
//         res.render("adminDashboard", {
//             students
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error loading dashboard");
//     }
// };

// const getAllStudents = async (req, res) => {
//     try {
//         // 1️⃣ Get students
//         const students = await Student.find().lean();

//         // 2️⃣ Get student details
//         const studentDetails = await StudentDetail.find().lean();

//         // 3️⃣ Manual merge (FIXED FIELD NAME HERE 👇)
//         const mergedStudents = students.map(student => {
//             const detail = studentDetails.find(
//                 d => d.student && d.student.toString() === student._id.toString()
//             );

//             return {
//                 ...student,
//                 detail: detail || null
//             };
//         });

//         res.render("adminDashboard", {
//             students: mergedStudents
//         });

//     } catch (error) {
//         console.error("Dashboard Error:", error);
//         res.status(500).send("Error loading dashboard");
//     }
// };



const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({ isAdmin: false }).lean();
        const studentDetails = await StudentDetail.find().lean();

        const mergedStudents = students.map(student => {
            const detail = studentDetails.find(
                d => d.student && d.student.toString() === student._id.toString()
            );

            return {
                ...student,
                detail: detail || null
            };
        });

        res.render("adminDashboard", {
            students: mergedStudents,
            totalStudents: mergedStudents.length-1,
            deleted: req.query.deleted
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).send("Error loading dashboard");
    }
};

module.exports = { getAllStudents };
