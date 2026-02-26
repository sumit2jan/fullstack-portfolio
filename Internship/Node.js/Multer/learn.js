const multer = require("multer");
const util = require("util");
const path = require("path");
const fs = require("fs");

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = `./uploads/${req.imagePath}`;
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/avif",
        "image/webm",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed"), false);
    }
};

const uploadsImage = multer({
    storage,
    fileFilter,
}).single("image");

// ✅ Modified version without resize
const uploadImageMiddleware = async (req, res) => {
    try {
        await util.promisify(uploadsImage)(req, res);

        // if (req.file) {
        //     return res.status(400).json({
        //         success: false,
        //         data: null,
        //         messages: `Only one ${req.imagePath} image is allowed.`,
        //     });
        // }

        return true; // ✅ explicitly return true
    } catch (error) {
        console.error("Image upload error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            messages: error.message,
        });
    }
};

module.exports = uploadImageMiddleware;