const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    icon: String,
    balance: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const AccountModel = mongoose.model("accounts", accountSchema);
module.exports = AccountModel