exports.isAdmin = (req, res, next) => {
    try {

        // Layer 2: DB flag check
        if (!req.user.isAdmin) {
            return res.status(403).send("Admin access required");
        }

        // Layer 3: Extra SUPER_ADMIN email check
        if (req.user.email !== process.env.SUPER_ADMIN_EMAIL) {
            return res.status(403).send("Super admin validation failed");
            //return res.redirect("/students/profile?type=updateSuccess");

        }

        next();

    } catch (error) {
        return res.status(500).send("Authorization error");
    }
};
