const mongoose = require("mongoose");
const userDetailSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
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

module.exports = mongoose.model("UserDetail", userDetailSchema);
