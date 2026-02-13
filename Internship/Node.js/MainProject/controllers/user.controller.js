const { model } = require("mongoose");
const User = require("../models/user.model");
const UserDetail = require("../models/userDetail.model");
const bcrypt = require("bcryptjs");


//create an user
createUser = async (req, res) => {
    try {
        const { name, email, password, gender, address, country, hobbies, phone, dob } = req.body;


        if (!name || !password || !email) {
            return res.status(401).json({
                success: false,
                message: "Registration failed: Name, Email, and Password are required.",
                data: null,
            });
        }
        // bcrypting a password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating instance of User
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const userSaved = await user.save(); // saving into the database

        if (!user || !userSaved._id) {
            return res.status(400).json({
                success: false,
                message: "User is not Created",
                data: null,
            });
        }
        //creating instance of UserDetail
        const userDetail = new UserDetail({
            userId: userSaved._id,
            gender,
            address,
            country,
            hobbies,
            phone,
            dob
        });

        const userDetailSaved = await userDetail.save(); // saving into the DB

        const userResponse = userSaved.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            data: {
                user: userResponse,
                userDetail: userDetailSaved
            },
            message: "user created successfully",

        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Error creating the Student",
            data: null,
            error: error.message,
        });
    }
}
// get all user
const getUsers = async (req, res) => {
    try {
        const users = await UserDetail.find({}).populate("userId");
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No users found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error fetching users",
            error: error.message
        });
    }
};

// get by the id 
const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userDetail = await UserDetail
            .findOne({ userId: id })
            .populate("userId");

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: {
                user: userDetail.userId,
                userDetail: {
                    gender: userDetail.gender,
                    address: userDetail.address,
                    country: userDetail.country,
                    hobbies: userDetail.hobbies,
                    phone: userDetail.phone,
                    dob: userDetail.dob
                }
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error fetching user",
            error: error.message
        });
    }
};

module.exports = {createUser,getUsers,getUser};