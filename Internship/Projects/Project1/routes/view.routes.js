const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authmiddleware")
const viewController = require("../controllers/view.controller");


router.get("/", viewController.homePage);  //home page
router.get("/register", viewController.getRegisterForm);  //regiester user
router.get("/login",viewController.getLoginForm);  //login page
router.get("/profile",protect,viewController.getProfile); // show user profile page

module.exports = router;