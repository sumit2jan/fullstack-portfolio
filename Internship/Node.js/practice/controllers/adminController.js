const User = require("../models/user");


const getAllUser = async (req, res) => {
    try { 
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 2;
        const search = req.query.search || "";

        // prevent invalid values
        if (page < 1) page = 1;
        if (limit < 1) limit = 2;
        if (limit > 50) limit = 50;

        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: `^${search}`, $options: "i" } },
                    { email: { $regex: `^${search}`, $options: "i" } }
                ]
            };
        }
        const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();  ;
        const totalUsers = await User.countDocuments(query);
        return res.status(200).json({
            success: true,
            message: users.length ? "Users fetched" : "No users found",
            data: users,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers: totalUsers,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching students",
            data: null,
            error: error.message,
        });
    }
}

module.exports = { getAllUser };