const express = require("express");
const router = express.Router();

const userControl = require("../controllers/userController");
const authControl = require("../controllers/authController");

router.post("/create", userControl.createUser);
router.get("/read", userControl.getUser);
router.get("/:id", userControl.getUserById);
router.patch("/update/:id", userControl.updateUser);
router.delete("/delete/:id", userControl.deleteUser);

// auth controller
router.post("/login", authControl.loginUser);
module.exports = router;