const mongoose = require("mongoose");
const TransactionModel = require("../models/transactions.model");
const AccountModel = require("../models/accounts.model");

// Create a Transaction
const createTransaction = async ({ type, amount, accountId, userId, category, notes }) => {
    const isIncome = type === 'Income';
    const curAmount = isIncome ? amount : -amount;
    const account = await AccountModel.findByIdAndUpdate(accountId, { $inc: { balance: curAmount } });

    await TransactionModel.create({ type, amount, accountId, balance: account?.balance + curAmount, userId, category, notes })
    return { type: "success", message: "Transaction created!" }
}

// Get Transactions By Account Id
const getTransactionsByAccount = async (accountId, query) => {
    const { row = 5, length = 5 } = query;
    const data = await TransactionModel.find({ accountId: accountId }, 'amount type category createdAt balance notes').skip(row - 5).limit(length).sort({ createdAt: -1 });
    return data || { message: "Account Not Found!", type: "error" };
}

// Get Transactions Category By Account Id
const getTransactionsDonutChart = async (accountId, query) => {
    const { type } = query;
    const data = await TransactionModel.aggregate([
        { $match: { accountId: new mongoose.Types.ObjectId(accountId), type: type, isDeleted: false } },
        { $group: { _id: "$category", count: { $sum: 1 }, amount: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", count: 1, amount: 1 } }
    ])
    return data || { message: "Account Not Found!", type: "error" };
}

// Get Line Chart transactions
const getLineChartTransactions = async (accountId, query) => {
    const { type } = query;

    const aggregateTransactions = async (transactionType) => {
        return await TransactionModel.aggregate([
            { $match: { accountId: new mongoose.Types.ObjectId(accountId), type: transactionType, isDeleted: false } },
            { 
                $group: { 
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
                    count: { $sum: 1 }, 
                    value: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, label: { $dateToString: { format: "%d-%m-%Y", date: { $dateFromString: { dateString: "$_id" } } } }, count: 1, value: 1 } },
        ]);
    };

    if(type){
        return await aggregateTransactions(type);
    }

    const incomeData = await aggregateTransactions("Income");
    const expenseData = await aggregateTransactions("Expense");

    const data = {
        Income: incomeData,
        Expense: expenseData
    }

    return data || { message: "Account Id Not Found!", type: "error" };
};


// Get Recent Transactions of an Account
const getRecentTransactions = async (accountId) => {
    const data = await (await TransactionModel.find({ accountId: accountId }, 'balance createdAt type').sort({ createdAt: -1 }).limit(20).lean()).reverse();
    return data || [];
}

module.exports = {
    createTransaction,
    getTransactionsByAccount,
    getTransactionsDonutChart,
    getLineChartTransactions,
    getRecentTransactions
}