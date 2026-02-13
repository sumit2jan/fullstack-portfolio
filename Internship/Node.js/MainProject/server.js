const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({});
const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("./api/user", require("./routes/user.routes"));
//app.use("./api/user", require("./routes/auth.routes"));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});