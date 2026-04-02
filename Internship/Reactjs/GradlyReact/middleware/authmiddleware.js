const jwt = require('jsonwebtoken');
const Student = require("../models/student.model"); // Import the correct model

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET matches .env
};


exports.protect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Not authorized, no token"
            });
        }

        const decode = verifyToken(token);

        const currentStudent = await Student.findById(decode.id).select("-password");

        if (!currentStudent) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        req.user = currentStudent;

        next();

    } catch (error) {
        console.log("Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            data: null,
            message: "Invalid or expired token"
        });
    }
};



// exports.protect = async(req , res, next)=>{

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         try {
//             token = req.headers.authorization.split(" ")[1];

//             const decoded = verifyToken(token);

//             req.user = await User.findById(decoded.id).select("-password");
            
//             if(!req.user){
//                 return res.status(401).json({
//                     success : false,
//                     data: null,
//                     message : "user not found"
//                 });
//             }

//             next();

//         } catch (error) {
//             return res.status(401).json({
//                    success : false,
//                     data: null,
//                     message : "Invalid or expire token" 
//             });
//         }

//     }
// }