const user = require("../models/user");

createUser = async (req, res) => {
    try {
        const { name, age, gender, email } = req.body;

        if (!name || !age || !gender || !email) {
             return res.status(401).json({
            success: false,
            message: "All fields are required.",
            data: null,
        });
        }
        //creating instance of student
        const user1 = new user({
            name,
            age,
            gender,
            email,
        });

        const userSaved = await user1.save();// saving into the DB

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: userSaved,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            success: false,
            message: "Error creating the Student",
            data: null,
            error: error.message,
        });
    }
}

getUser = async (req, res) => {
    try {
        const users = await user.find();

        return res.status(200).json({
            success: true,
            message: "All students found successfully",
            data: users,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Error fetching students",
            data: null,
            error: error.message,
        });
    }
}

getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await user.findById(id);
        if (!userById) {
            return res.status(404).json({
                status: false,
                message: "Student not Found",
                data: null,
            });
        }
        return res.status(200).json({
            status: true,
            message: "Student found successfully",
            data: userById,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            data: null,
            message: "Invalid student ID",
            error: error.message,
        });
    }
}

module.exports = { getUser, createUser, getUserById }