const fs = require("fs");
const path = require("path");
const Image = require("../models/image.model");

const getImagePage = async (req, res) => {
    try {
        const image = await Image.findOne();
        res.render("index", { image });
    } catch (error) {
        console.log(error);
        res.status(500).send("server Error");
    }
};

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.send("no file uploaded");
        }
        const existingImage = await Image.findOne();
        if (existingImage) {
            const oldPath = path.join(__dirname, "..", existingImage.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            existingImage.image = "uploads/" + req.file.filename;
            await existingImage.save();
        } else {
            await Image.create({
                image: "uploads/" + req.file.filename
            });
        }
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload failed");
    }
};


// delete controller

const deleteImage = async (req, res) => {
    try {
        const existingImage = await Image.findOne();

        if (!existingImage) {
            return res.redirect("/");
        }

        const filePath = path.join(__dirname, "..", existingImage.image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await existingImage.deleteOne();
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Delete failed");
    }
}


module.exports = {deleteImage,uploadImage,getImagePage};