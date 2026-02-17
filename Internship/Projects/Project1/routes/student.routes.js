const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");


router.post("/register", studentController.createStudent);
// router.get("/all", userController.getStudents);
//  router.get("/:id", userController.getStudent);

module.exports = router;