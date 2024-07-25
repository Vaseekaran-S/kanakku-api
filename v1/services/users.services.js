const UserModel = require("../models/users.model");

// Check User Exists or Not
const userExist = async (email) => {
    return await UserModel.exists({ email: email }) 
}

// Get all User
const getUsers = async () => {
    const data = await UserModel.find({ isDeleted: false });
    return data;
};

// Delete all User
const deleteUsers = async () => {
    const data = await UserModel.deleteMany();
    return data;
};

// Create a User
const createUser = async ({ name, email, mobile, password }) => {
    const data = await UserModel.create({ name, email, mobile, password });
    return { msg: "User created!", data };
};

// Get a User
const getUser = async (email) => {
    const data = await UserModel.findOne({ email: email, isDeleted: false });
    return data || { msg: "User Not Found!" };
};

// Update a User
const updateUser = async (email, body) => {
    const data = await UserModel.updateOne({ email: email }, { name: body?.name });
    return { msg: "User Data Updated!" };
};

// Delete a User
const deleteUser = async (email) => {
    const data = await UserModel.updateOne({ email: email }, { isDeleted: true });
    return { msg: "User Data Deleted!" };
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUsers,
    userExist,
    deleteUser,
    deleteUsers
};