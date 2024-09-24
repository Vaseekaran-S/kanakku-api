const AccountModel = require("../models/accounts.model");
const { textToUrl } = require("../utils/urlMaker");

// Check Account Exists or Not
const isAccountExist = async ({ name, userId, accountId }) => {
    return await AccountModel.exists({ _id: { $ne: accountId },name: name, userId: userId, isDeleted: false })
}

// Find Account Limit for a user
const isLimitReached = async (userId) => {
    const length = await AccountModel.countDocuments({ userId: userId, isDeleted: false });
    return length >= 10 ? true : false;
}

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
    const data = await AccountModel.find({ userId: userId, isDeleted: false }, 'url name icon type balance createdAt updatedAt');
    return data;
};

// Get an Account by name
const getUserAccountByName = async (userId, url) => {
    const data = await AccountModel.findOne({ userId: userId, url: url, isDeleted: false }, 'url name icon balance type createdAt updatedAt');
    return data || { message: "Account Not Found!", type: "error" };
};

// Create an Account
const createAccount = async ({ name, userId, balance = 0, icon }) => {
    name = name.replace(/\s+/g, ' ').trim();
    const url = textToUrl(name);
    
    if (await isLimitReached(userId)) {
        return { type: "error", message: "You can only create 10 accounts per email!", error: "Limit Reached" };
    }
    if (await isAccountExist({ name, userId })) {
        return { type: "warning", message: "Account already exist with this name!", error: "Client Error" };
    }
    await AccountModel.create({ name, userId, balance, icon, url });
    return { type: "success", message: "Account created!" };
};

// Update an Account
const updateAccount = async (accountId, { userId, name, balance, icon }) => {
    name = name.replace(/\s+/g, ' ').trim();
    const url = textToUrl(name);
    if (await isAccountExist({ accountId, name, userId })) {
        return { type: "warning", message: "Account already exist with this name!", error: "Client Error" };
    }
    await AccountModel.updateOne({ _id: accountId }, { name, balance, icon, url });
    return { message: "Account Data Updated!", type: "success" };
};

// Change an Account Type
const changeAccountType = async (accountId, type) => {
    const response = await AccountModel.updateOne({ _id: accountId }, { type });
    if(response?.matchedCount === 0) return { message: "Account Not Found!", type: "error" };
    return { message: "Account Type Changed!", type: "success" };
};

// Delete an Account
const deleteAccount = async (accountId) => {
    const response = await AccountModel.updateOne({ _id: accountId }, { isDeleted: true });
    if(response?.matchedCount === 0) return { message: "Account Not Found!", type: "error" };
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
    getUserAccountByName,
    updateAccount,
    changeAccountType,
    deleteAccount,
    deleteAccounts
};