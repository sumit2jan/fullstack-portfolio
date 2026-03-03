const express = require("express");
const connectDB = require("./config/db");
const multer = require("multer");
const Image = require("./models/image.model")
const path = require("path");
const app = express();

connectDB();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;
        cb(null, uniqueName);
    }
});


const upload = multer({   //middleware
    storage: storage
});


app.post("/upload", upload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const newImage = await Image.create({
            image: req.file.path
        });
        res.status(201).json({
            message: "Image uploaded successfully",
            data: newImage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});
app.get("/", (req, res) => {
    res.send("Server is running...");
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});