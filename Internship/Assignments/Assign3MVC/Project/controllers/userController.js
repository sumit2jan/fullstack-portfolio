const User = require("../models/user");
const UserDetail = require("../models/userDetail");
const bcrypt = require("bcryptjs");

// yha user create kra hai maine
createUser = async (req, res) => {
    try {
        const { name, email, password, gender, address, country, hobbies, phone, dob } = req.body;


        if (!name || !password || !email) {
            return res.status().json({
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


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            gender,
            address,
            country,
            hobbies,
            phone,
            dob
        } = req.body;

        const userUpdateData = {};

        if (name) userUpdateData.name = name;

        const userDetailData = {};
        if(gender) userDetailData.gender = gender;
        if(address) userDetailData.address = address;
        if(country) userDetailData.country = country;
        if(hobbies) userDetailData.hobbies = hobbies;
        if(phone) userDetailData.phone = phone;
        if(dob) userDetailData.dob = dob;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            userUpdateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        const updatedUserDetail = await UserDetail.findOneAndUpdate(
            { userId: id },
            userDetailData,
            { new: true, runValidators: true }
        );
        if (!updatedUserDetail) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        const userUpdatedResponse = updatedUser.toObject();
        delete userUpdatedResponse.password;

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                user: userUpdatedResponse,
                userDetail: updatedUserDetail
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error updating user",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }
        await UserDetail.findOneAndDelete({ userId: id });

        return res.status(200).json({
            success: true,
            message: "User and UserDetail deleted successfully",
            data: deletedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error deleting user",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Invalid email or password"
            });
        }

        const userResponse = user.toObject();
        delete userResponse.password;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userResponse
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Error during login",
            error: error.message
        });
    }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser,login }

