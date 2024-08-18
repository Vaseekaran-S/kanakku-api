const AccountModel = require("../models/accounts.model");

// Check Account Exists or Not
const isAccountExist = async ({ name, userId }) => {
    return await AccountModel.exists({ name: name, userId: userId, isDeleted: false })
}

// Create an Account
const createAccount = async ({ name, userId, balance, image }) => {
    if (await isAccountExist({ name, userId })) {
        return { type: "warning", message: "Account already exist with this name!", error: "Client Error" };
    }
    await AccountModel.create({ name, userId, balance, image });
    return { type: "success", message: "Account created!" };
};

// Get all Accounts Data
const getAllAccounts = async () => {
    const data = await AccountModel.find({ isDeleted: false });
    return data || { message: "Account Not Found!", type: "error" };
};

// Get an Account
const getAccount = async (accountId) => {
    const data = await AccountModel.findOne({ _id: accountId, isDeleted: false });
    return data || { message: "Account Not Found!", type: "error" };
};

// Get a User Accounts
const getUserAccounts = async (userId) => {
    const data = await AccountModel.find({ userId: userId, isDeleted: false });
    return data;
};

// Update an Account
const updateAccount = async (accountId, body) => {
    const data = await AccountModel.updateOne({ _id: accountId }, { ...body });
    return { message: "Account Data Updated!", type: "success" };
};

// Delete an Account
const deleteAccount = async (accountId) => {
    const data = await AccountModel.updateOne({ accountId: accountId }, { isDeleted: true });
    return { message: "Account Data Deleted!", type: "success" };
};

// Delete all Account
const deleteAccounts = async () => {
    const data = await AccountModel.deleteMany();
    return data;
};

module.exports = {
    createAccount,
    getAccount,
    getAllAccounts,
    getUserAccounts,
    updateAccount,
    deleteAccount,
    deleteAccounts
};