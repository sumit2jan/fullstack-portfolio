const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authmiddleware");
const viewController = require("../controllers/view.controller");

router.get("/", viewController.homePage);  //home page
router.get("/register", viewController.getRegisterForm);  //regiester user
router.get("/login",viewController.getLoginForm);  //login page
router.get("/change-password", protect, viewController.getChangePasswordPage);// change Password Route 
router.get("/profile",protect,viewController.getProfile);//Profile
router.get("/logout",viewController.logout); // show user profile page
router.get("/edit/:id", protect, viewController.getEditProfile);//Update
router.get("/forgot-password",viewController.getForgotPassword);// forgotPassword page link
router.get("/reset-password",viewController.getResetPassword);// reset password  page link


module.exports = router;