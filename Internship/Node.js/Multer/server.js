const express = require("express");
const connectDB = require("./config/db");
const multer = require("multer");
const imageRoutes = require("./routes/image.routes")
const path = require("path");
const app = express();

// mongo DB
connectDB();


// view engine
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

// Static Folder
app.use(express.static("uploads"));
app.use("/",imageRoutes);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});



// for the postman
// app.post("/upload", upload.single("profilePic"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }
//         const newImage = await Image.create({
//             image: req.file.path
//         });
//         res.status(201).json({
//             message: "Image uploaded successfully",
//             data: newImage
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });