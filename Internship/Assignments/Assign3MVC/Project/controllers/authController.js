const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

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

        const token = generateToken(user);

        if (!token) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "token not generated"
            });
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: { userResponse, token }
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


module.exports = { login };