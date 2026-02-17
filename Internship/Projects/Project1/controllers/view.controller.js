// login ejs page 
const getLoginForm = (req, res) => {
    res.render("login", {
        errors: {},
        student: req.user || null,
        success: false
    });
};

const getProfile = (req, res) => {
    res.render("profile", {
        errors: {},
        student: req.user || null, // Empty object for initial load
        success: false
    });
};

const homePage = (req, res) => {
    // 'index' refers to 'views/index.ejs'
    res.render("index", {
        title: "Student Portal",
        message: "Welcome to the Student Management System"
    });
};

const getRegisterForm = (req, res) => {
    res.render("register", {
        errors: {},
        data: {}, // Empty object for initial load
        success: false
    });
};


module.exports = { getLoginForm, getProfile, homePage, getRegisterForm };