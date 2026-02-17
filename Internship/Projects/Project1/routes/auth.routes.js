const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authmiddleware")
const authController = require("../controllers/auth.controller");



router.post("/login", authController.loginStudent);



module.exports = router;
