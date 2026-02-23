const { sendMail } = require("../utils/helperFuntion");

exports.mailSend = async (req, res) => {
    try {
        const { email, content, subject } = req.body;
        const isMailSent = await sendMail({ email, content, subject });
        if (!isMailSent) {
            return res.json({
                success: false
            });
        }
        return res.json({
            success: true
        });
    } catch (error) {
        console.log("error", error)
        return res.json({
            success: false
        });
    }
}