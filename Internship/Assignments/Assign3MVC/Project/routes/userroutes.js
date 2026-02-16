const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware")

router.post("/register", userController.createUser);
router.get("/all", userController.getUsers);
router.get("/:id", userController.getUser);
router.patch("/update/:id", protect, userController.updateUser);
router.delete("/delete/:id",protect, userController.deleteUser);

module.exports = router;
