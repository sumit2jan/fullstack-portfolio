const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const adminController = require("../controllers/admin.controller");
const {protect} = require("../middleware/authmiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");


// student main controller link
router.post("/register", studentController.createStudent); //Register
router.post("/edit/:id", protect, studentController.updateProfile); //Update
router.post("/delete/:id", protect, studentController.deleteStudent); //delete

// forgotpassword link
router.get("/forgot-password",studentController.getForgotPassword);// forgot page link
router.post("/forgot-password",studentController.forgotPassword);// forgotPassword controller

router.get("/reset-password",studentController.getResetPassword);// reset password  page link
router.post("/reset-password",studentController.resetPassword);// reset password controller link


//email verification link
router.get("/verify-email",studentController.verifyEmailToken);// verify token route
router.post("/resendVerification",studentController.resendVerification);// verify token route

// dashboard link
router.get("/admin/dashboard", protect, isAdmin, adminController.getAllStudents);// gel all students


module.exports = router;