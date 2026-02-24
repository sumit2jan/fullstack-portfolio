const jwt = require("jsonwebtoken");

exports.generateToken = (student) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing");
    }

    return jwt.sign(
        { id: student._id },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    );
};

exports.EmailVerificationToken = (studentId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing");
    }
    return jwt.sign(
        {
            id: studentId,
            type: "emailVerification"
        },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
    );
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
};

