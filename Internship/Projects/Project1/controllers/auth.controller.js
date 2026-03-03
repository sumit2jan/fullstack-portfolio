const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/helperFuntion");
const { EmailVerificationToken, verifyToken, generateResetPasswordToken,generateToken } = require("../utils/generate.token");

// login page api
const loginStudent = async (req, res) => {
    try {
        //console.log("Incoming Request Body:", req.body);
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

// verify after registration 
const verifyEmailToken = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.send("invalid verification link.");
        }
        const decoded = verifyToken(token);

        if (decoded.type !== "emailVerification") { // checking the type here
            return res.send("invalid token type");
        }

        const student = await Student.findById(decoded.id);

        if (!student) {
            return res.send("student not found.");
        }
        if (student.verificationTokenExpiry < Date.now()) {
            return res.render("verificationexpired", { email: student.email });
        }

        if (student.verificationToken !== token) {
            return res.send("token mismatch.");
        }

        student.isValid = true;
        student.verificationToken = null;
        student.verificationTokenExpiry = null;

        await student.save();

        return res.render("verification.ejs");

    } catch (error) {
        console.log(error);
        return res.send("invalid or expired token");
    }
};

// resend verification controller
const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.send("Student not found.");
        }
        if (student.isValid) {
            return res.send("Account already verified.");
        }
        // 1️ Generate new token
        const verificationToken = EmailVerificationToken(student._id);
        student.verificationToken = verificationToken;
        student.verificationTokenExpiry = Date.now() + 1 * 60 * 1000;
        await student.save();

        // 2️ Send email again
        const verificationLink = `http://localhost:4000/students/verify-email?token=${verificationToken}`;

        await sendMail({
            email: student.email,
            subject: "Verify Your Email",
            content: `
        <h2>Hello ${student.firstName},</h2>
        <p>Please click the button below to verify your email:</p>
        
        <a href="${verificationLink}" 
           style="display:inline-block;
                  padding:10px 20px;
                  background-color:#2563eb;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:5px;">
            Verify Email
        </a>

        <p>This link will expire in 1 minutes.</p>
        `
        });

        //return res.send("Verification email sent again.");
        return res.redirect("/students/login?type=verificationEmailSend");

    } catch (error) {
        console.log(error);
        return res.send("Something went wrong.");
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


module.exports = { loginStudent,verifyEmailToken,resendVerification,forgotPassword,resetPassword,changePassword };
