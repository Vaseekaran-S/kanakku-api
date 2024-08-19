const UserModel = require("../models/users.model");
const { hashPassword } = require("../utils/encrypt");
const { verifyJwtToken } = require("../utils/jwt");
const { sendEmailVerificationToken } = require("./auth.service");

// Check User Exists or Not
const isUserExist = async (email) => {
    return await UserModel.exists({ email: email, isDeleted: false })
}


// Create a User
const createUser = async ({ name, email, mobile, password, type }) => {
    const user = await UserModel.findOne({ email: email });
    if (user) {
        if (user?.isEmailVerified) {
            if (!await verifyJwtToken(user?.emailVerificationToken)) return { type: "warning", message: "Email is not verified!", error: "Client Error" };
            return { type: "warning", message: "This mail is already taken!", error: "Client Error" };
        }
        return { type: "warning", message: "Email is not verified!", error: "Client Error" };
    }
    const { token } = await sendEmailVerificationToken(email);
    const encryptedPassword = await hashPassword(password);
    await UserModel.create({ name, email, mobile, type, password: encryptedPassword, emailVerificationToken: token });

    return { type: "success", message: "Verify your Email ID!" };
};

// Get a User
const getUser = async (email) => {
    const data = await UserModel.findOne({ email: email, isDeleted: false }, 'email name mobile');
    return data || { message: "User Not Found!", type: "error" };
};

// Get all User
const getUsers = async () => {
    const data = await UserModel.find({ isDeleted: false });
    return data;
};

// Update a User
const updateUser = async (email, body) => {
    const data = await UserModel.updateOne({ email: email }, { ...body });
    return { message: "User Data Updated!" };
};

// Delete a User
const deleteUser = async (email) => {
    if (!await isUserExist(email))
        return { message: "User not Found!", type: "error", status: 404 }
    const data = await UserModel.updateOne({ email: email }, { isDeleted: true });
    console.log(data);
    return { message: "User Data Deleted!", status: 200 };
};

// Delete all User
const deleteUsers = async () => {
    const data = await UserModel.deleteMany();
    return data;
};

module.exports = {
    isUserExist,
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    deleteUsers
};