const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const {protect} = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadMiddleware");
// student main controller link
router.post("/register",upload.single("image"), studentController.createStudent); //Register
router.post("/edit/:id", protect,upload.single("image"),studentController.updateProfile); //Update
router.post("/delete/:id", protect, studentController.deleteStudent); //delete



module.exports = router;