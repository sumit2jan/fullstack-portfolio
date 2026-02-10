const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/read/", userController.getUsers);
router.get("/read/:id", userController.getUser);

module.exports = router;
