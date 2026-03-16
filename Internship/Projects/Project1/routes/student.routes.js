const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const {protect} = require("../middleware/authmiddleware");
const uploadImage = require("../middleware/uploadImageMiddleware");
// student main controller link
router.post("/register",uploadImage.single("image"), studentController.createStudent); //Register
router.post("/edit/:id", protect,uploadImage.single("image"),studentController.updateProfile); //Update
router.post("/delete/:id", protect, studentController.deleteStudent); //delete

module.exports = router;