const UserModel = require("../models/users.model");
const { hashPassword } = require("../utils/encrypt");

// Check User Exists or Not
const isUserExist = async (email) => {
    return await UserModel.exists({ email: email }) 
}

// Create a User
const createUser = async ({ name, email, mobile, password }) => {
    if(await isUserExist(email))
        return { msg: "This mail is already taken!", error: "Client Error", status: 409 };
    
    const encryptedPassword = await hashPassword(password)
    await UserModel.create({ name, email, mobile, password: encryptedPassword });
    return { msg: "User created!", status: 200 };
};

// Get a User
const getUser = async (email) => {
    const data = await UserModel.findOne({ email: email, isDeleted: false });
    return data || { msg: "User Not Found!" };
};

// Get all User
const getUsers = async () => {
    const data = await UserModel.find({ isDeleted: false });
    return data;
};

// Update a User
const updateUser = async (email, body) => {
    const data = await UserModel.updateOne({ email: email }, { name: body?.name });
    return { msg: "User Data Updated!" };
};

// Delete a User
const deleteUser = async (email) => {
    if(!await isUserExist(email))
        return { msg: "User not Found!", status: 404 }
    const data = await UserModel.updateOne({ email: email }, { isDeleted: true });
    console.log(data);
    return { msg: "User Data Deleted!", status: 200 };
};

// Delete all User
const deleteUsers = async () => {
    const data = await UserModel.deleteMany();
    return data;
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    getUsers,
    isUserExist,
    deleteUser,
    deleteUsers
};