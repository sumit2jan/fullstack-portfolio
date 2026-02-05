const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testing")
.then(()=>console.log("Server is connected"))
.catch((err)=>console.log("error:",err))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// app.get("/get",async(req,res)=>{
//     console.log("req:",req)
// res.send("<h1>Hello world</h1>")
// })
const studentSchema = new mongoose.Schema({// yha schema define kra maine
    name: String,
    age: Number,
    email: String
});

const student = mongoose.model("student",studentSchema);

console.log("Schema object:", student.schema.obj);
console.log("Schema paths:", student.schema.paths);
app.listen(8000,()=>console.log("Server is running:",8000));