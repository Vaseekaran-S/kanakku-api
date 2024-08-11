const path = require("path");

const UserModel = require("../models/users.model");
const { createJwtToken, verifyJwtToken } = require("../utils/jwt");
const sendMail = require("../utils/nodemailer");
const { verifyHashPassword } = require("../utils/encrypt");

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
    return { token, ...response }
}


// Verify Email Token
const emailTokenVerification = async(token) => {
    const isValid = await verifyJwtToken(token);
    if(isValid){
        await UserModel.updateOne( { email: isValid?.userMail }, { isEmailVerified: true })
        return { message: "User Email is Verified!", type: "success" }
    }
    return { message: "User Email is not Verified!", type: "error" }
}

module.exports = {
    verifyUser,
    sendVerificationCode,
    emailTokenVerification
}