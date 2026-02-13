const express = require("express");
const connectDB = require("./config/db")
const app = express();
require("dotenv").config({})
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/user", require("./routes/authRoutes"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});
