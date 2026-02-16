const express = require("express");
const connectDB = require("./config/db");
const path = require('path');
require("dotenv").config({});

const app = express();
connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/students", require("./routes/student.routes"));
//app.use("./api/user", require("./routes/auth.routes"));
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});