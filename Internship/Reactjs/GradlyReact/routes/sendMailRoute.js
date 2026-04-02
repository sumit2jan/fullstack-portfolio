const express = require("express");
const router = express.Router();
const sendMailController = require("../controllers/sendMailController");

// Register route to send mail for the verification
router.post("/send", sendMailController.mailSend); 


module.exports = router;