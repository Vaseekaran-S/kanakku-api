
const nodemailer = require("nodemailer");
const ejs = require("ejs");

// POSTMAN SETUP
const botMailId = process.env.MAIL_BOT_ID;
const POSTMAN = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: botMailId,
        pass: process.env.MAIL_BOT_PASS
    }
})


// Mail Function to send Mail
const sendMail = async(data, subject, templatePath) => {
    try {
        const htmlFile = await ejs.renderFile(templatePath, { data });
        const mailData = { 
            from: botMailId,
            to: data?.email,
            subject: subject,
            html: htmlFile
        }
        const mailInfo = await POSTMAN.sendMail(mailData);
        return { message: "Email Sent!", type: "success", info: mailInfo?.response }
    } catch (error) {
        return { message: "Email not Send!", type: "error", error: error?.message }
    }
}

module.exports = sendMail