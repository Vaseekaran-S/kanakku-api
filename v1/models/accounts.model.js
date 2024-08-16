const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    image: String,
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