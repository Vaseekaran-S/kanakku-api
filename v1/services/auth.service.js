const { createJwtToken } = require("../utils/jwt");
const sendMail = require("../utils/nodemailer");
const path = require("path")

// Verify Token
const verifyUser = async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email, isDeleted: false }).select('-isDeleted -__v');
    if(!user) return { message: "Email Id is wrong or not yet registered!", type: "error" };
    
    const isPasswordCorrect = await verifyHashPassword(password, user?.password);
    if(!isPasswordCorrect) return { message: "Password is wrong!", type: "error" };
    const token = await createJwtToken(email);
    
    return { ...user, message: "User Authenticated!", type: "success", token };
};


// Send verification Code to Email
const sendVerificationCode = async(email) => {
    const subject = "Email verification for Kanakku";
    const templatePath = path.join(__dirname + "/../emails/verify-email.ejs");
    const token = await createJwtToken(email);
    const response = await sendMail({ email, token }, subject, templatePath);
    return response
}

module.exports = {
    verifyUser,
    sendVerificationCode
}