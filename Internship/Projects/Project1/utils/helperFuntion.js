const { createTransport } = require("../service/nodemailer");

exports.sendMail = async ({ email, subject, content }) => {
    try {
        const transporter = await createTransport()
        let emaildata;
        // console.log("emailData", emaildata)
        const info = await transporter.sendMail({
            from: `${process.env.SMTP_APP_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: email,
            subject: subject,
            text: content
        });
        return true

    } catch (error) {
        throw new Error(error);

    }
}