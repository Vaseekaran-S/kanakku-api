const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        default: 0,
        require: true
    },
    balance: {
        type: Number,
        require: true
    },
    accountId: {
        type: mongoose.Schema.ObjectId,
        ref: "Account",
        require: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    category: String,
    notes: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const TransactionModel = mongoose.model("transactions", transactionSchema);
module.exports = TransactionModel;