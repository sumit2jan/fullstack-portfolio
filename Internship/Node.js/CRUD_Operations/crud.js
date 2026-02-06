const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/testing")
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("error:", err))

const studentSchema = new mongoose.Schema({// yha schema define kra maine
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
},
    {
        timestamps: true,
    });


const Student = mongoose.model("Student", studentSchema);
// testing the data is inderting or not
// const testInsert = async () => {
//   try {
//     const student = new Student({
//       name: "Test User",
//       age: 21,
//       gender: "male",
//       email: "testuser@example.com"
//     });

//     const savedStudent = await student.save();
//     console.log("Student inserted:", savedStudent);
//   } catch (error) {
//     console.log("Insert error:", error.message);
//   }
// };

// Call once
//testInsert();


app.get("/", (req, res) => {
    res.send("Hello World");
});

// create API is created 
app.post("/student/create", async (req, res) => {
    try {
        const { name, age, gender, email } = req.body;

        //creating instance of student
        const student = new Student({
            name,
            age,
            gender,
            email,
        });
        const studentSaved = await student.save();// saving into the DB

        return res.status(201).json({
            succes: true,
            message: "Student created successfully",
            data: studentSaved,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            success: false,
            message: "Error creating the Student",
            data: null,
            error: error.message,
        });
    }
});

// now we are going to create the read api Function with an id or without an id 
// READ ALL
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            status: true,
            message: "All students found successfully",
            data: students,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Error fetching students",
            data: null,
            error: error.message,
        });
    }
});

// READ BY ID
app.get("/student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                status: false,
                message: "Student not Found",
                data: null,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Student found successfully",
            data: student,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            data: null,
            message: "Invalid student ID",
            error: error.message,
        });
    }
});


// now going to create the API for the updation of the data upadate
app.patch("/student/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,            //Return updated data (not old)
            runValidators: true,  //Enforce schema rules
        });
        if (!updatedStudent) {
            return res.status(404).json({
                status: false,
                message: "Student not Found",
                data: null,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Student updates Successfullt",
            data: updatedStudent,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            status: false,
            message: "Error Updating Student",
            data: null,
            error: error.message,
        });
    }
});
app.listen(5000, () => {
    console.log("Server is Running:", 5000);
});
