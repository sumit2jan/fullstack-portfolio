const mongoose = require("mongoose");
const userDetailSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        gender: {
            type: String
        },

        address: {
            type: String
        },

        country: {
            type: String
        },

        hobbies: {
            type: [String]
        },

        phone: {
            type: String
        },

        dob: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserDetail",userDetailSchema);