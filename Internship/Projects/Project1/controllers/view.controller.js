const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/helperFuntion");
const { EmailVerificationToken, verifyToken, generateResetPasswordToken, generateToken } = require("../utils/generate.token");

// login ejs page 
const getLoginForm = (req, res) => {
    res.render("login", {
        errors: {},
        student: req.user || null,
        messageType: req.query.type
    });
};

//Profile Page
const getProfile = async (req, res) => {
    try {
        const basicUser = req.user;
        const user = await Student
            .findById(basicUser._id)
            .select("-password");
        const userDetails = await StudentDetail.findOne({
            student: basicUser._id
        });
        const userObj = user ? user.toObject() : {};
        const detailObj = userDetails ? userDetails.toObject() : {};
        delete detailObj._id; // delting because it is overriting the student_id 

        const mergedStudent = {
            ...userObj,
            ...detailObj
        };
        res.render("profile", {
            student: mergedStudent,
            messageType: req.query.type,
            errors: {}
        });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).send("Something went wrong.");
        //return res.redirect("/students/profile?type=ErrorProfilePage");
    }
};

//Home Page
const homePage = (req, res) => {
    // 'index' refers to 'views/index.ejs'
    res.render("index", {
        title: "Student Portal",
        message: "Welcome to the Student Management System"
    });
};

//Register Page
const getRegisterForm = (req, res) => {
    res.render("register", {
        errors: {},
        data: {}, // Empty object for initial load
        success: false
    });
};


//logout Page
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false
    });
    return res.redirect("/students/login?type=logout");
};

// update Page
const getEditProfile = async (req, res) => {
    try {
        const paramId = req.params.id;
        const loggedInId = req.user._id.toString();

        console.log("Param ID:", paramId);
        console.log("LoggedIn ID:", loggedInId);

        if (!req.user.isAdmin && paramId !== loggedInId) {
            return res.status(403).send("Unauthorized access");
        }

        const user = await Student.findById(paramId).select("-password");

        const userDetails = await StudentDetail.findOne({
            student: paramId
        });

        const userObj = user ? user.toObject() : {};
        const detailObj = userDetails ? userDetails.toObject() : {};

        delete detailObj._id; // delting because it is overriting the student_id 

        const mergedStudent = {
            ...userObj,
            ...detailObj
        };

        res.render("editProfile", {
            student: mergedStudent,
            messageType: req.query.type || null,
            errors: {}
        });

    } catch (error) {
        console.error("Edit Fetch Error:", error);
        res.status(500).send("Something went wrong.");
    }
};


// get forgotpassword
const getForgotPassword = async (req, res) => {
    try {
        res.render("forgot-password");
    } catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
};

//  get verify Forgot PasswordToken
const getResetPassword = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.render("resetexpired");
        }

        // 1️ Verify JWT
        const decoded = verifyToken(token);

        // 2️ Check token type
        if (decoded.type !== "passwordReset") {
            return res.render("resetexpired");
        }

        // 3️ Find student & match token
        const student = await Student.findOne({
            _id: decoded.id,
            resetPasswordToken: token
        });

        if (!student) {
            return res.render("resetexpired");
        }

        // 4️ Check expiry
        if (student.resetPasswordExpire < Date.now()) {
            return res.render("resetexpired");
        }

        // 5️ Everything valid → show reset form
        return res.render("reset-password", {
            token
        });

    } catch (error) {
        console.log(error);
        return res.render("resetexpired");
    }
};


module.exports = { getLoginForm, getProfile, homePage, getRegisterForm, logout, getEditProfile, getForgotPassword, getResetPassword };