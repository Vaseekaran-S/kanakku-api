const path = require("path");

const UserModel = require("../models/users.model");

const { getUser } = require("./users.service");
const { createJwtToken, verifyJwtToken } = require("../utils/jwt");
const sendMail = require("../utils/nodemailer");
const { verifyHashPassword, hashPassword } = require("../utils/encrypt");

// Send verification Code to Email
const sendEmailVerificationToken = async(email) => {
    const subject = "Email verification for Kanakku";
    const templatePath = path.join(__dirname + "/../emails/verify-email.ejs");
    const token = await createJwtToken(email);
    const response = await sendMail({ email, token }, subject, templatePath);
    return { token, ...response }
}

// SIGNUP: Create User
const createUser = async ({ name, email, mobile, password, type }) => {
    const user = await UserModel.findOne({ email: email });
    if (user) {
        if (user?.isEmailVerified)
            return { type: "warning", message: "This mail is already taken!", error: "Client Error" };
        else{
            const { token } = await sendEmailVerificationToken(email);
            const encryptedPassword = await hashPassword(password);
            await UserModel.updateOne({ email: email }, { name: name, mobile: mobile, type: type, password: encryptedPassword, emailVerificationToken: token })
            return { type: "warning", message: "Email is not verified!", error: "Client Error", mailSend: true };
        }
    }
    const { token } = await sendEmailVerificationToken(email);
    const encryptedPassword = await hashPassword(password);
    await UserModel.create({ name, email, mobile, type, password: encryptedPassword, emailVerificationToken: token });

    return { type: "success", message: "Verify your Email ID!", isA: true };
};

// LOGIN: Verify User Token
const verifyUser = async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email, isDeleted: false }).select('-isDeleted -__v');
    if(!user) return { message: "Email Id is wrong or not yet registered!", type: "error" };
    
    const isPasswordCorrect = await verifyHashPassword(password, user?.password);
    if(!isPasswordCorrect) return { message: "Password is wrong!", type: "error" };
    const token = await createJwtToken(email);
    
    return { ...user, message: "User Authenticated!", type: "success", token };
};



// Verify Email Token
const emailTokenVerification = async(token) => {
    const isValid = await verifyJwtToken(token);
    if(isValid){
        await UserModel.updateOne( { email: isValid?.userMail }, { isEmailVerified: true })
        return { message: "User Email is Verified!", type: "success", isEmailVerified: true }
    }
    return { message: "User Email is not Verified!", type: "error", isEmailVerified: false }
}


// Send forgot password token to Email
const sendForgotPasswordToken = async(email) => {
    const subject = "Reset Password Now - Kanakku";
    const templatePath = path.join(__dirname + "/../emails/forgot-password.ejs");
    const token = await createJwtToken(email);

    const { name } = await getUser(email);
    const data = {
        email, token, name
    }
    const response = await sendMail(data, subject, templatePath);
    return { token, ...response }
}

module.exports = {
    createUser,
    verifyUser,
    sendEmailVerificationToken,
    emailTokenVerification,
    sendForgotPasswordToken
}