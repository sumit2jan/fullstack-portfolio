const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");

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
            messageType: req.query.type|| null,
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        //res.status(500).send("Error loading dashboard");
        return res.redirect("/students/profile?type=DashboardError");

    }
};

module.exports = { getAllStudents };
