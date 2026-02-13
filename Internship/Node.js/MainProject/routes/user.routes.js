const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.createUser);
router.get("/all", userController.getUsers);
router.get("/:id", userController.getUser);

module.exports = router;