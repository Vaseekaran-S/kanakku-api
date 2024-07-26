const bcrypt = require("bcrypt")

// Create a encrypted password
const saltRounds = 10;
const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch(err){
        throw err;
    }
}

// Verify encrypted password
const verifyHashPassword = async (password, hashedPassword) => {
    try{
        return await bcrypt.compare(password, hashedPassword);
    }catch(err){
        throw err;
    }
}

module.exports = {
    hashPassword,
    verifyHashPassword
}