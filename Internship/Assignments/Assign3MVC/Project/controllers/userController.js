const User = require("../models/user");
const UserDetail = require("../models/userDetail");

createUser = async (req, res) => {
    try {
        const { name, email, password, gender, address, country, hobbies, phone, dob } = req.body;


        if (!name || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
                data: null,
            });
        }

        //creating instance of User
        const user = new User({
            name,
            email,
            password
        });

        const userSaved = await user.save(); // saving into the DB

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

        const userDetailSaved = await userDetail.save();// saving into the DB

        return res.status(201).json({
            success: true,
            data: {
                user: userSaved,
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



module.exports = { createUser, }

