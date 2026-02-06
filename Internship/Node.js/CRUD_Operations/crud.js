const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/testing")
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log("error:",err))

const studentSchema = new mongoose.Schema({// yha schema define kra maine
    name:{
      type: String,
      required: true,
      trim: true,
    } ,
    age:{ 
      type: Number,
      required: true,
      min: 1,},
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    email:{      
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,},
},
   {
    timestamps: true,
   });


const Student = mongoose.model("Student",studentSchema);
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


app.get("/",(req,res) => {
    res.send("Hello World");
});

// create API is created 
app.post("/Add",async(req,res)=>{
  try{
    const {name,age,gender,email} = req.body;

    //creating instance of student
    const student = new Student({
        name,age,gender,email,
    });
    const studentSaved = await student.save();

    res.status(201).json({
        message: "Student created succesfly",
        data: studentSaved,
    });
  }catch(error){
        res.status(400).json({
            message: "Error creating the Student",
            error: error.message,
        });
  }
});

app.listen(5000,()=>{
    console.log("Server is Running:",5000);
});
