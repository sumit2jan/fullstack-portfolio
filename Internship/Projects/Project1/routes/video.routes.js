const express = require("express");
const router = express.Router();

const { uploadVideo } = require("../controllers/video.controller");
const {protect} = require("../middleware/authmiddleware");
const uploadVideoMiddleware = require("../middleware/uploadVideoMiddleware");

router.post("/upload",protect,uploadVideoMiddleware.single("video"),uploadVideo);


module.exports = router;