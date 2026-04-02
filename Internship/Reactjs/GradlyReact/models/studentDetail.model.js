const mongoose = require("mongoose");
const studentDetailSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: [true, "Student reference is required"],
            unique: true,
        },

        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [1, "Age must be at least 1"],
            max: [120, "Age must be less than 120"],
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: {
                values: ["Male", "Female", "Other"],
                message: "Gender must be Male, Female, or Other",
            },
        },

        phone: {
            type: String,
            unique: true,
            required: [true, "Phone number is required"],
            match: [
                /^[0-9]{10}$/,
                "Phone number must be exactly 10 digits",
            ],
        },

        pan: {
            type: String,
            unique: true,
            required: [true, "PAN number is required"],
            uppercase: true,
            match: [
                /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                "Invalid PAN format (e.g., ABCDE1234F)",
            ],
        },

        adhar: {
            type: String,
            unique: true,
            required: [true, "Adhar number is required"],
            match: [
                /^[0-9]{12}$/,
                "Adhar must be exactly 12 digits",
            ],
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
            minlength: [10, "Address must be at least 10 characters"],
        },

        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
        },

        hobbies: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0;
                },
                message: "At least one hobby is required",
            },
        }
        ,

        dob: {
            type: Date,
            required: [true, "Date of Birth is required"],
        },
        image: {
            type: String,
            default: "/uploads/default.png"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudentDetail", studentDetailSchema);
