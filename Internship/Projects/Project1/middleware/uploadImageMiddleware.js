const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        uploadPath = path.join("uploads", "images", "profile");
        // create folder if not exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files allowed"));
    }
};

const uploadImage = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

module.exports = uploadImage;


// const createUploader = (type = "images") => {

//     const storage = multer.diskStorage({

//         destination: function (req, file, cb) {

//             const uploadPath = path.join("uploads", type);

//             if (!fs.existsSync(uploadPath)) {
//                 fs.mkdirSync(uploadPath, { recursive: true });
//             }

//             cb(null, uploadPath);
//         },

//         filename: function (req, file, cb) {

//             const uniqueName =
//                 Date.now() +
//                 "-" +
//                 Math.round(Math.random() * 1e9) +
//                 path.extname(file.originalname);

//             cb(null, uniqueName);
//         }
//     });

//     const fileFilter = (req, file, cb) => {

//         let allowedTypes;
//         let errorMessage;

//         if (type === "images") {
//             allowedTypes = /jpeg|jpg|png/;
//             errorMessage = "Only image files (jpg, jpeg, png) allowed";
//         }

//         if (type === "videos") {
//             allowedTypes = /mp4|mov|mkv|avi/;
//             errorMessage = "Only video files allowed";
//         }

//         const extname = allowedTypes.test(
//             path.extname(file.originalname).toLowerCase()
//         );

//         const mimetype = allowedTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             cb(null, true);
//         } else {
//             cb(new Error(errorMessage));
//         }
//     };

//     let fileSizeLimit = 5 * 1024 * 1024; // default 5MB

//     if (type === "videos") {
//         fileSizeLimit = 50 * 1024 * 1024; // 50MB
//     }

//     return multer({
//         storage,
//         limits: { fileSize: fileSizeLimit },
//         fileFilter
//     });
// };

// module.exports = createUploader;