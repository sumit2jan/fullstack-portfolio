const mongoose = require("mongoose");
const images = new mongoose.Schema({
    image:{
        type: String,
        required: true
    }
},{timestamps: true});
module.exports = mongoose.model("Image",images);