const Student = require("../models/student.model");
const StudentDetail = require("../models/studentDetail.model");

// const getAllStudents = async (req, res) => {
//     try {

//         const students = await Student.aggregate([
//             {
//                 $match: { isAdmin: false }
//             },
//             {
//                 $lookup: {
//                     from: "studentdetails",   // must match actual collection name
//                     localField: "_id",
//                     foreignField: "student",
//                     as: "detail"
//                 }
//             },
//             {
//                 $unwind: {
//                     path: "$detail",
//                     preserveNullAndEmptyArrays: true
//                 },
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     firstName: 1,
//                     lastName: 1,
//                     email: 1,
//                     isAdmin: 1,
//                     detail: 1
//                 }
//             }
//         ]);

//         res.status(200).json({
//             success: true,
//             data: students,
//             message:"Students Fetched Successfully"
//         })

//     } catch (error) {
//         console.error("Dashboard Error:", error);
//         return res.status(500).json({
//             success: false,
//             data:null,
//             message:"Something Went Wrong",
//             error: error.message
//         })
//     }
// };

const getAllStudents = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const search = req.query.search || "";
        const gender = req.query.gender || "";
        const country = req.query.country || "";

        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 50) limit = 50;

        const skip = (page - 1) * limit;

        let matchStage = {
            isAdmin: false
        };

        if (search) {
            matchStage.$or = [
                { firstName: { $regex: `^${search}`, $options: "i" } },
                { lastName: { $regex: `^${search}`, $options: "i" } },
                { email: { $regex: `^${search}`, $options: "i" } }
            ];
        }

        const pipeline = [
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "studentdetails",
                    localField: "_id",
                    foreignField: "student",
                    as: "detail"
                }
            },
            {
                $unwind: {
                    path: "$detail",
                    preserveNullAndEmptyArrays: true
                }
            },
        ];

        //  Filter (after lookup because gender/country in detail)
        if (gender) {
            pipeline.push({
                $match: { "detail.gender": gender }
            });
        }

        if (country) {
            pipeline.push({
                $match: { "detail.country": country }
            });
        }

        const allowedSortFields = ["firstName", "createdAt", "email"];
        let sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

        pipeline.push({
            $sort: { [sortField]: order }
        });

        pipeline.push({
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                isVerified: 1,
                age: "$detail.age",
                gender: "$detail.gender",
                country: "$detail.country",
                image: "$detail.image",
                createdAt: 1
            }
        });

        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });

        const students = await Student.aggregate(pipeline);

        // Total Count (for pagination)
        const totalPipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "studentdetails",
                    localField: "_id",
                    foreignField: "student",
                    as: "detail"
                }
            },
            {
                $unwind: {
                    path: "$detail",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        if (gender) {
            totalPipeline.push({ $match: { "detail.gender": gender } });
        }

        if (country) {
            totalPipeline.push({ $match: { "detail.country": country } });
        }

        totalPipeline.push({ $count: "total" });

        const totalResult = await Student.aggregate(totalPipeline);
        const totalStudents = totalResult[0]?.total || 0;

        // Response
        return res.status(200).json({
            success: true,
            message: students.length ? "Students fetched" : "No students found",
            data: students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            totalStudents: totalStudents,
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching students",
            data: null,
            error: error.message,
        });
    }
};

const toggleVerify = async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;

        const student = await Student.findByIdAndUpdate(
            id,
            { isVerified },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Verification updated",
            data: student
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating verification"
        });
    }
};

const getAllStudentsRedux = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const search = req.query.search || "";
        const gender = req.query.gender || "";
        const country = req.query.country || "";

        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 50) limit = 50;

        const skip = (page - 1) * limit;

        let matchStage = {
            isAdmin: false
        };

        if (search) {
            matchStage.$or = [
                { firstName: { $regex: `^${search}`, $options: "i" } },
                { lastName: { $regex: `^${search}`, $options: "i" } },
                { email: { $regex: `^${search}`, $options: "i" } }
            ];
        }

        const pipeline = [
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "studentdetails",
                    localField: "_id",
                    foreignField: "student",
                    as: "detail"
                }
            },
            {
                $unwind: {
                    path: "$detail",
                    preserveNullAndEmptyArrays: true
                }
            },
        ];

        //  Filter (after lookup because gender/country in detail)
        if (gender) {
            pipeline.push({
                $match: { "detail.gender": gender }
            });
        }

        if (country) {
            pipeline.push({
                $match: { "detail.country": country }
            });
        }

        const allowedSortFields = ["firstName", "createdAt", "email"];
        let sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

        pipeline.push({
            $sort: { [sortField]: order }
        });

        pipeline.push({
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                isVerified: 1,
                age: "$detail.age",
                gender: "$detail.gender",
                country: "$detail.country",
                image: "$detail.image",
                createdAt: 1
            }
        });

        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });

        const students = await Student.aggregate(pipeline);

        // Total Count (for pagination)
        const totalPipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "studentdetails",
                    localField: "_id",
                    foreignField: "student",
                    as: "detail"
                }
            },
            {
                $unwind: {
                    path: "$detail",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        if (gender) {
            totalPipeline.push({ $match: { "detail.gender": gender } });
        }

        if (country) {
            totalPipeline.push({ $match: { "detail.country": country } });
        }

        totalPipeline.push({ $count: "total" });

        const totalResult = await Student.aggregate(totalPipeline);
        const totalStudents = totalResult[0]?.total || 0;

        // Response
        return res.status(200).json({
            success: true,
            message: students.length ? "Students fetched" : "No students found",
            data: students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            totalStudents: totalStudents,
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching students",
            data: null,
            error: error.message,
        });
    }
};
module.exports = { getAllStudents, toggleVerify, getAllStudentsRedux };


