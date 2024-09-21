
const TransactionModel = require("../models/transactions.model");

// Create a Transaction
const createTransaction = async ({ type, amount, accountId, userId, category, notes }) => {
    await TransactionModel.create({ type, amount, accountId, userId, category, notes })
    return { type: "success", message: "Transaction created!" }
}

// Get Transactions By Account Id
const getTransactionsByAccount = async (accountId, query) => {
    const { row = 5 } = query;
    const data = await TransactionModel.find({ accountId: accountId }, 'amount type category createdAt notes').skip(row-5).limit(5).sort({ createdAt: -1 });
    return data || { message: "Account Not Found!", type: "error" };
}

module.exports = {
    createTransaction,
    getTransactionsByAccount
}