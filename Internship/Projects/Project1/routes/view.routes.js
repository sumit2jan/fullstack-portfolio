const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authmiddleware");
const viewController = require("../controllers/view.controller");
const { isAdmin } = require("../middleware/adminMiddleware");


router.get("/", viewController.homePage);  //home page
router.get("/register", viewController.getRegisterForm);  //regiester user
router.get("/login",viewController.getLoginForm);  //login page
router.get("/profile",protect,viewController.getProfile);//Profile
router.get("/logout",viewController.logout); // show user profile page
router.get("/edit/:id", protect, viewController.getEditProfile);//Update

module.exports = router;