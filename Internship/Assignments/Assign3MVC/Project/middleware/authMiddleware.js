const User = require("../models/user");
const { verifyToken } = require("../utils/generateToken");

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);

            req.user = await User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: "User not found"
                });
            }
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Invalid or expired token"
            });
        }
    }
}