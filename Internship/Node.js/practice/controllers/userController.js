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
                message: "user not Found",
                data: null,
            });
        }
        return res.status(200).json({
            status: true,
            message: "user found successfully",
            data: userById,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            data: null,
            message: "Invalid user ID",
            error: error.message,
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await user.findByIdAndUpdate(id, req.body, {
            new: true,            //Return updated data (not old)
            runValidators: true,  //Enforce schema rules
        });
        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                message: "user not Found",
                data: null,
            });
        }
        return res.status(200).json({
            status: true,
            message: "user updates Successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            message: "Error Updating user",
            data: null,
            error: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await user.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({
                status: false,
                message: "User not Found, nothing to delete",
                data: null,
            });
        }
        return res.status(200).json({
            status: true,
            message: "User deleted successfully",
            data: deleteUser,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            message: "Error deleting User",
            data: null,
            error: error.message,
        });
    }
}

module.exports = { getUser, createUser, getUserById,updateUser,deleteUser}