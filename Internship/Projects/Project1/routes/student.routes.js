const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const {protect} = require("../middleware/authmiddleware");

// student main controller link
router.post("/register", studentController.createStudent); //Register
router.post("/edit/:id", protect, studentController.updateProfile); //Update
router.post("/delete/:id", protect, studentController.deleteStudent); //delete



module.exports = router;