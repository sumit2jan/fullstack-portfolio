const User = require("../models/user");


const getAllUser = async (req, res) => {
    try { 
        const users = await User.find();

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

module.exports = { getAllUser };