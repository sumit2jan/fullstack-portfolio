const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const adminController = require("../controllers/admin.controller");
const {protect} = require("../middleware/authmiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");


router.post("/register", studentController.createStudent); //Register
router.post("/edit/:id", protect, studentController.updateProfile); //Update
router.post("/delete/:id", protect, studentController.deleteStudent); //delete
router.get("/admin/dashboard", protect, isAdmin, adminController.getAllStudents);// gel all students


module.exports = router;