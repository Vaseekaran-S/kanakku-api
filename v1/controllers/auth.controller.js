const { verifyUser, sendVerificationCode } = require("../services/auth.service");
const { createUser } = require("../services/users.service");
const { verifyJwtToken } = require("../utils/jwt");

// POST: New User SignUp
const userSignUp = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password)
            return res.status(400).json({ error: "Client Error", type: "error", message: "Name, Email, Mobile & Password are required!" })

        const response = await createUser(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ message: "Something went wrong at Server!", type: "error", error: error?.message })
    }
}

// POST: User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password)
            return res.status(400).json({ error: "Client Error", type: "error", message: "Email & Password are required!" })

        const response = await verifyUser(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ message: "Something went wrong at Server!", type: "error", error: error?.message })
    }
}


// GET: Token Verification
const tokenVerification = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(400).json({ error: "Client Error", type: "error", message: "Token is not in header!" })
        let response = await verifyJwtToken(token);
        response = response ? { ...response, isTokenValid: true, message: "User Token Valid!" } : { isTokenValid: false, message: "User Token is Expired!" }

        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ message: "Something went wrong at Server!", type: "error", isTokenValid: false, error: error?.message })
    }
}

// POST: Email Verification
const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: "Client Error", type: "error", message: "Email is not in body!" })

        const response = await sendVerificationCode(email);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ message: "Something went wrong at Server!", type: "error", error: error?.message })
    }
}

// POST: Email Code Verification
const verifyEmailCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: "Client Error", type: "error", message: "Email is not in body!" })
        let response = await verifyJwtToken(token);
        response = response ? { ...response, isTokenValid: true, message: "User Token Valid!" } : { isTokenValid: false, message: "User Token is Expired!" }
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ message: "Something went wrong at Server!", type: "error", error: error?.message })
    }
}

module.exports = {
    userSignUp,
    userLogin,
    tokenVerification,
    verifyEmail,
    verifyEmailCode
}