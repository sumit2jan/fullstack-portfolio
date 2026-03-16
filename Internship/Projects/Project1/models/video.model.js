const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
{
studentId: {
type: mongoose.Schema.Types.ObjectId,
ref: "Student",
required: true
},

videoUrl: {
    type: String,
    required: true
}
},

{
timestamps: true
}
);

module.exports = mongoose.model("Video", videoSchema);
