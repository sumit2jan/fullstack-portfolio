const jwt = require('jsonwebtoken');
const Student = require("../models/student.model"); // Import the correct model

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET matches .env
};

exports.protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // 1. Check if token exists
        if (!token) { 
            return res.redirect('/login'); 
        }
        // 2. Verify token
        const decode = verifyToken(token);
        // 3. Find the student using the ID from the token
        const currentStudent = await Student.findById(decode.id).select("-password");
        
        if (!currentStudent) { 
            return res.redirect('/students/login'); 
        }
        // 4. Attach student to request object
        req.user = currentStudent; 
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        // Clear invalid cookie so user can try again cleanly
        res.clearCookie("token");
        return res.redirect('/students/login');
    }
}