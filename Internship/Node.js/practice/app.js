const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));

const port = 6000;
app.listen(port, () => {
    console.log(`Server is running on server: ${port}`);
})
