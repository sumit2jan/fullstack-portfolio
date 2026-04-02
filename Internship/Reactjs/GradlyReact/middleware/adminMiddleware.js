exports.isAdmin = (req, res, next) => {
    //   console.log("isAdmin middleware hit ✅");
    // console.log("User:", req.user);
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                data: null,
                message: "Not authorized"
            });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Access denied: Admin only"
            });
        }

        if (req.user.email !== process.env.SUPER_ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                data: null,
                message: "Access denied: Super admin only"
            });
        }

        next();

    } catch (error) {
        console.log("Admin Error:", error.message);

        return res.status(500).json({
            success: false,
            data: null,
            message: "Authorization error"
        });
    }
};
