
const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    emailVerificationToken: String,
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const UserModel = mongoose.model("users", UserShema)
module.exports = UserModel