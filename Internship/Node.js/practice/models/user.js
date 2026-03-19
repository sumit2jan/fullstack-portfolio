const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({// yha schema define kra maine
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false, // Won’t show in queries
    },
},
    {
        timestamps: true,
    });

  
module.exports = mongoose.model("user", userSchema);