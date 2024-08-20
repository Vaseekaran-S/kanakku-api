const { createUser, verifyUser, sendEmailVerificationToken, emailTokenVerification, sendForgotPasswordToken, resetUserPassword } = require("../services/auth.service");
const { isUserExist } = require("../services/users.service");
const { verifyJwtToken } = require("../utils/jwt");

// POST: New User SignUp
const userSignUp = async (req, res) => {
    try {
        const { name, email, mobile, password, type } = req.body;
        if (!name || !email || !mobile || !password || !type)
            return res.json({ error: "Client Error", type: "error", message: "Name, Email, Mobile, Type & Password are required!" })

        const response = await createUser(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}

// POST: User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password)
            return res.json({ error: "Client Error", type: "error", message: "Email & Password are required!" })

        const response = await verifyUser(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}


// GET: Token Verification
const tokenVerification = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.json({ error: "Client Error", type: "error", message: "Token is not in header!" })
        let response = await verifyJwtToken(token);
        response = response ? { ...response, isTokenValid: true, message: "User Token Valid!" } : { isTokenValid: false, message: "User Token is Expired!" }

        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", isTokenValid: false, error: error?.message })
    }
}

// POST: Email Verification
const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.json({ error: "Client Error", type: "error", message: "Email is not in body!" })

        const response = await sendEmailVerificationToken(email);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}

// POST: Email Token Verification
const verifyEmailToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token)
            return res.json({ error: "Client Error", type: "error", message: "Token is not in body!" })
        
        const response = await emailTokenVerification(token);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}


// POST: Forgot Password
const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.json({ error: "Client Error", type: "error", message: "Email is not in body!" })
        
        if(!await isUserExist(email))
            return res.json({ error: "Client Error", type: "error", message: "Email is not registered!" })

        const response = await sendForgotPasswordToken(email);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}

// POST: Reset Password
const resetPassword = async(req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password)
            return res.json({ error: "Client Error", type: "error", message: "Token or Password is not in body!" })

        const response = await resetUserPassword({ token, newPassword: password });
        res.json(response)
    } catch (error) {
        res.json({ message: "Something went wrong!", type: "error", error: error?.message })
    }
}

module.exports = {
    userSignUp,
    userLogin,
    tokenVerification,
    verifyEmail,
    verifyEmailToken,
    forgotPassword,
    resetPassword
}