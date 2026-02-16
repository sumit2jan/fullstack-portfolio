const express = require("express");
const router = express.Router();
const userController = require("../controllers/student.controller");

router.get("/", (req, res) => {
    // 'index' refers to 'views/index.ejs'
    res.render("index", {
        title: "Student Portal",
        message: "Welcome to the Student Management System"
    });
});

router.get("/register", userController.getRegisterForm);

router.post("/register", userController.createStudent);
// router.get("/all", userController.getStudents);
//  router.get("/:id", userController.getStudent);

module.exports = router;