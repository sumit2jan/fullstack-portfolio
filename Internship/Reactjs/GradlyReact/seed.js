const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Student = require("./models/student.model");
const StudentDetail = require("./models/studentDetail.model");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const firstNames = ["Rahul", "Amit", "Neha", "Priya", "Rohit", "Ankit", "Simran", "Pooja", "Karan", "Arjun"];
const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Yadav", "Mehta", "Kumar", "Raj", "Malhotra", "Kapoor"];
const hobbiesList = ["Reading", "Gaming", "Music", "Travel", "Sports", "Coding"];

const generateRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const runSeeder = async () => {
  try {
    await Student.deleteMany();
    await StudentDetail.deleteMany();

    const hashedPassword = await bcrypt.hash("test@1234", 10);

    for (let i = 1; i <= 100; i++) {
      const firstName = generateRandom(firstNames);
      const lastName = generateRandom(lastNames);

      const student = await Student.create({
        firstName,
        lastName,
        email: `student${i}@yopmail.com`,
        password: hashedPassword,
        isVerified: true,
        otp: null,
        otpExpiry: null,
        resetPasswordToken: null,
        resetPasswordExpire: null
      });

      await StudentDetail.create({
        student: student._id,
        age: Math.floor(Math.random() * 10) + 18,
        gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        pan: `ABCDE${1000 + i}F`,
        adhar: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        address: `House No ${i}, Sector ${Math.floor(Math.random() * 50)}, Delhi`,
        country: "India",
        hobbies: [generateRandom(hobbiesList)],
        dob: new Date(2000, 0, i),
        image: "/uploads/default.png"
      });
    }

    console.log("✅ 100 Dummy Students Created Successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit();
  }
};

runSeeder();