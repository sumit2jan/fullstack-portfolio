const express = require("express");
const router = express.Router();
const sendMailController = require("../controllers/sendMailController");


router.post("/send", sendMailController.mailSend); //Register


module.exports = router;