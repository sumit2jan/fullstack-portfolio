const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

//filtering the file here

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    if(isValid){
        cb(null,true);
    }else{
        cb(new error("only images are allowed!"),false);
    }
};

// main middleware function 
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;