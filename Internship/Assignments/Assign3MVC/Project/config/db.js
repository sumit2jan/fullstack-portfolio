const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Practice");
        console.log("DataBase Connected Succesfully");
    } catch (error) {
        console.log("DB error: ", error);
    }
};

module.exports = connectDB;
//connectDB();