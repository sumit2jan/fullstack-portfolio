const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authmiddleware");
const adminController = require("../controllers/admin.controller");
const { isAdmin } = require("../middleware/adminMiddleware");

// gel all students  dashboard link it is a admin route
router.get("/admin/dashboard", protect, isAdmin, adminController.getAllStudents);
router.get("/admin/dashboardRedux", protect, adminController.getAllStudentsRedux);// for redex
router.patch("/verify/:id", protect, isAdmin, adminController.toggleVerify);



module.exports = router;