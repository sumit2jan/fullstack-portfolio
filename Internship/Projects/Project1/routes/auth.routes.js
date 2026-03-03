const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {protect} = require("../middleware/authmiddleware");

//login route
router.post("/login", authController.loginStudent);

//email verification link
router.get("/verify-email",authController.verifyEmailToken);// verify token route
router.post("/resendVerification",authController.resendVerification);// verify token route

// forgotpassword link
router.post("/forgot-password",authController.forgotPassword);// forgotPassword controller
router.post("/reset-password",authController.resetPassword);// reset password controller link

//change password route
router.post("/change-password", protect, authController.changePassword);



module.exports = router;
