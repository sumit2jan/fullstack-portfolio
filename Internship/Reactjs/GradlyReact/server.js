const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const cookieparser = require("cookie-parser");
const path = require('path');
require("dotenv").config({});
require("./cron/otpCleanup");

app.use(cors());

connectDB();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("uploads")); // multer storage area

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
app.use("/students", require("./routes/admin.routes"));
app.use("/students", require("./routes/video.routes"));
app.use("/students", require("./routes/auth.routes"));
app.use("/students", require("./routes/view.routes"));
app.use("/mail", require("./routes/sendMailRoute")); // bs yeh samjhne ke liye banaya tha hamne bs post mai se bhejne ke lie
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
});