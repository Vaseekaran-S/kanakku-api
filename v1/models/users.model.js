
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
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
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