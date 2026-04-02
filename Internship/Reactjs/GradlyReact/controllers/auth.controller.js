const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/helperFuntion");
const { verifyToken, generateResetPasswordToken, generateToken } = require("../utils/generate.token");

// login page 
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            });
        }
        const student = await Student.findOne({
            email: email.toLowerCase()
        }).select("+password");

        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
                data: null
            });
        }
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
                data: null
            });
        }
        if (!student.isVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedOtp = await bcrypt.hash(otp, 10);

            student.otp = hashedOtp;
            student.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

            await student.save();

            try {
                await sendMail({
                    email: student.email,
                    subject: "OTP Verification",
                    content: `
                        <h2>Hello ${student.firstName},</h2>
                        <p>Your OTP for login verification is:</p>
                        
                        <h1 style="color:#2563eb;">${otp}</h1>
                        
                        <p>This OTP will expire in 5 minutes.</p>
                    `
                });
            } catch (mailError) {
                console.log("Mail Error:", mailError);

                return res.status(500).json({
                    success: false,
                    message: "Failed to send OTP email",
                    data: null
                });
            }

            return res.status(403).json({
                success: false,
                message: "Account not verified. OTP sent to email.",
                isVerified: false,
                email: student.email
            });
        }
        const token = generateToken(student);

        const studentResponse = student.toObject();
        delete studentResponse.password;
        delete studentResponse.otp;
        delete studentResponse.otpExpiry;

        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            data: {
                student: studentResponse,
                token
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
            error: error.message
        });
    }
};



// verify after registration with otp
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email?.trim() || !otp?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
                data: null
            });
        }

        const student = await Student.findOne({
            email: email.toLowerCase()
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        if (student.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified",
                data: null
            });
        }

        if (!student.otpExpiry || student.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
                data: null
            });
        }

        const isMatch = await bcrypt.compare(otp, student.otp);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
                data: null
            });
        }

        student.isVerified = true;

        student.otp = null;
        student.otpExpiry = null;

        await student.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login.",
            data: null
        });

    } catch (err) {
        console.log("Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error verifying OTP",
            data: null,
            error: err.message
        });
    }
};

// resend verification controller
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const student = await Student.findOne({
            email: email.toLowerCase()
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (student.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified",
            });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP
        const hashedOtp = await bcrypt.hash(otp, 10);

        // New expiry
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        //Update DB
        student.otp = hashedOtp;
        student.otpExpiry = otpExpiry;

        await student.save();

        // Send Email
        await sendMail({
            email,
            subject: "Resend OTP",
            content: `
                <h2>Hello,</h2>
                <p>Your new OTP is:</p>
                <h1>${otp}</h1>
                <p>Valid for 5 minutes</p>
            `
        });

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Error resending OTP",
            error: err.message
        });
    }
};

// change password api
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        const student = await Student.findById(req.user.id).select("+password");

        if (!student) {
            return res.render("changePassword", {
                error: "Student not found"
            });
        }

        // 1️ Check old password
        const isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch) {
            return res.render("changePassword", {
                error: "Old password is incorrect"
            });
        }

        // 2️ Check new password match
        if (newPassword !== confirmPassword) {
            return res.render("changePassword", {
                error: "New passwords do not match"
            });
        }

        // 3️ Prevent same password reuse
        const isSamePassword = await bcrypt.compare(newPassword, student.password);
        if (isSamePassword) {
            return res.render("changePassword", {
                error: "New password cannot be same as old password"
            });
        }

        // 4️ Optional: Password length validation
        if (newPassword.length < 6) {
            return res.render("changePassword", {
                error: "Password must be at least 6 characters"
            });
        }

        // 5️ Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;

        await student.save();

        // 6️ Clear JWT Cookie (Force logout)
        res.clearCookie("token");

        // 7️ Redirect to login page with message
        return res.redirect("/students/login?type=passwordChanged");

    } catch (error) {
        console.error(error);
        return res.render("changePassword", {
            error: "Something went wrong"
        });
    }
};
//forgot password Controller
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const student = await Student.findOne({ email });

        // Security: do NOT reveal if email exists
        if (!student) {
            return res.redirect("/students/login?type=resetEmailSend");
        }

        // if (!student.isValid || student.verificationToken == null) {
        //     return res.render("verificationexpired", { email: student.email });
        // }

        // 1️ Generate Reset Token
        const resetToken = generateResetPasswordToken(student._id);

        // 2️ Store token + expiry in DB
        student.resetPasswordToken = resetToken;
        student.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
        await student.save();

        // 3️ Create reset link
        const resetLink = `http://localhost:4000/students/reset-password?token=${resetToken}`;

        // 4️ Send Email
        await sendMail({
            email: student.email,
            subject: "Reset Your Password",
            content: `
                <h2>Hello ${student.firstName},</h2>
                <p>Click the button below to reset your password:</p>

                <a href="${resetLink}" 
                   style="display:inline-block;
                          padding:10px 20px;
                          background-color:#2563eb;
                          color:#ffffff;
                          text-decoration:none;
                          border-radius:5px;">
                    Reset Password
                </a>

                <p>This link will expire in 5 minutes.</p>
            `
        });

        return res.redirect("/students/login?type=resetEmailSend");

    } catch (error) {
        console.log(error);
        return res.send("Something went wrong.");
    }
};

// updating password here
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.render("resetexpired");
        }

        // 1️ Verify JWT
        const decoded = verifyToken(token);

        if (decoded.type !== "passwordReset") {
            return res.render("resetexpired");
        }

        // 2️ Find student & match token
        const student = await Student.findOne({
            _id: decoded.id,
            resetPasswordToken: token
        });

        if (!student) {
            return res.render("resetexpired");
        }

        // 3️ Check expiry
        if (student.resetPasswordExpire < Date.now()) {
            return res.render("resetexpired");
        }

        // 4️ Hash new password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // student.password = hashedPassword;

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);

        // 5️ Clear reset token fields
        student.resetPasswordToken = null;
        student.resetPasswordExpire = null;

        await student.save();

        return res.redirect("/students/login?type=passwordResetSuccess");

    } catch (error) {
        console.log(error);
        return res.render("resetexpired");
    }
};

module.exports = { loginStudent, verifyOtp, resendOtp, forgotPassword, resetPassword, changePassword };
