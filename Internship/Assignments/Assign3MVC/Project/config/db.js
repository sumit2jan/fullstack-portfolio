const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase Connected Succesfully");
    } catch (error) {
        console.log("DB error: ", error);
    }
};

module.exports = connectDB;
//connectDB();