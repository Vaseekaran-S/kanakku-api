const UserModel = require("../models/users.model");
const { hashPassword, verifyHashPassword } = require("../utils/encrypt");
const { createJwtToken } = require("../utils/jwt");

// Check User Exists or Not
const isUserExist = async (email) => {
    return await UserModel.exists({ email: email })
}

// Create a User
const createUser = async ({ name, email, mobile, password }) => {
    if (await isUserExist(email))
        return { type: "warning", message: "This mail is already taken!", error: "Client Error" };

    const encryptedPassword = await hashPassword(password);
    await UserModel.create({ name, email, mobile, password: encryptedPassword });
    const token = await createJwtToken(email);
    return { type: "success", message: "User created!", token };
};

// Get a User
const getUser = async (email) => {
    const data = await UserModel.findOne({ email: email, isDeleted: false });
    return data || { message: "User Not Found!", type: "error" };
};

// Get all User
const getUsers = async () => {
    const data = await UserModel.find({ isDeleted: false });
    return data;
};

// Update a User
const updateUser = async (email, body) => {
    const data = await UserModel.updateOne({ email: email }, { name: body?.name });
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