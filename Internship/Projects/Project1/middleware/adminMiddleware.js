exports.isAdmin = (req, res, next) => {
    try {

        // Layer 2: DB flag check
        if (!req.user.isAdmin) {
            // return res.status(403).send("Admin access required");
            return res.redirect("/students/profile?type=adminRequired");
        }

        // Layer 3: Extra SUPER_ADMIN email check
        if (req.user.email !== process.env.SUPER_ADMIN_EMAIL) {
            //return res.status(403).send("Super admin validation failed");
            return res.redirect("/students/profile?type=superAdminFailed");

        }

        next();

    } catch (error) {

        // console.log("Admin Error:", error.message);
        // return res.redirect('/students/profile');
        return res.status(500).send("Authorization error");
        // return res.render("profile", {
        //     errors,
        //     data: req.body,
        //     success: false
        // });
    }
};
