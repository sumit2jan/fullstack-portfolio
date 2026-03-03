const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const imageController = require("../controllers/image.controller");

router.get("/",imageController.getImagePage);
router.post("/upload", upload.single("image"),imageController.uploadImage);
router.post("/delete",imageController.deleteImage);

module.exports = router;