const Video = require("../models/video.model");

const uploadVideo = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send("No video uploaded");
        }

        const videoPath = "/uploads/videos/" + req.file.filename;

        const video = await Video.create({
            studentId: req.user._id,
            videoUrl: videoPath
        });

        res.redirect("/students/profile");

    } catch (error) {
        console.log(error);
        res.status(500).send("Video upload failed");
    }
};


module.exports = {
    uploadVideo
};