const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cookieparser = require("cookie-parser");
const path = require('path');
require("dotenv").config({});


connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.use((req, res, next) => {
    const token = req.cookies.token;
    // 'isLoggedIn' ab har EJS file mein direct use ho sakta hai
    res.locals.isLoggedIn = !!token;
    next();
});

//routes
app.use("/students", require("./routes/student.routes"));
app.use("/students", require("./routes/auth.routes"));
app.use("/students", require("./routes/view.routes"));
app.use("/mail", require("./routes/sendMailRoute"));
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});