
const jwt = require("jsonwebtoken");

const secretKey = "kanakku-token-provider";

// Create a Token
const createJwtToken = async(userMail) => {
    return jwt.sign({userMail}, secretKey, { expiresIn: "12h" });
}

// Verify Token
const verifyJwtToken = async(token) => {
    try{
        return jwt.verify(token, secretKey);
    }catch(err){
        return false;
    }
}

module.exports = {
    createJwtToken,
    verifyJwtToken
}