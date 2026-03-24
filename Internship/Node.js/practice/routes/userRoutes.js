const express = require("express");
const router = express.Router();

const userControl = require("../controllers/userController");
const authControl = require("../controllers/authController");
const adminControl = require("../controllers/adminController");

router.post("/create", userControl.createUser); //Creating the user 

//admin route
router.get("/read", adminControl.getAllUser);  //DashBoard


//router.get("/:id", userControl.getUserById); 
router.put("/update/:id", userControl.updateUser);
router.delete("/delete/:id", userControl.deleteUser);

// auth controller
router.post("/login", authControl.loginUser);
module.exports = router;