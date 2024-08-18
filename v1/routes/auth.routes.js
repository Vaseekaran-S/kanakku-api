const router = require("express").Router()
const { userSignUp, userLogin, tokenVerification, verifyEmail, verifyEmailToken, forgotPassword } = require("../controllers/auth.controller")

router.post("/signup", userSignUp)
router.post("/login", userLogin)
router.get("/token", tokenVerification)
router.post("/verify-email", verifyEmail)
router.post("/verify-email-token", verifyEmailToken)

router.post("/forgot-password", forgotPassword)

module.exports = router