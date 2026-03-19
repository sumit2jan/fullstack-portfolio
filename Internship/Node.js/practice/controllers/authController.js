const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token")

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required.",
                data: null,
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Wrong email or password"
            })
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            data: { user, token },
            message: "user login successfully"
        })

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = { loginUser };