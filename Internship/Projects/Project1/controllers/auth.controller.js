const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generate.token");

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                error: "Both Email and Password are required"
            });
        }

        const student = await Student.findOne({ email }).select("+password");

        if (!student) {
            return res.render("login", {
                error: "Student does not exist"
            });
        }

        if (!student.isValid || student.verificationToken !== null) {
            return res.render("verificationexpired", { email: student.email });
        }


        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.render("login", {
                error: "Invalid Password",
                email: email
            });
        }

        const token = generateToken(student);

        console.log("Generated Token:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.redirect("/students/profile")

    } catch (error) {
        console.error("Login Error:", error);
        return res.render("login", {
            error: error.message || "Something went wrong"
        });
    }
};
module.exports = { loginStudent };
