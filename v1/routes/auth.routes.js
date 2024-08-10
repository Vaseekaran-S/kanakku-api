const router = require("express").Router()
const { userSignUp, userLogin, tokenVerification, verifyEmail, verifyEmailCode } = require("../controllers/auth.controller")

router.post("/signup", userSignUp)
router.post("/login", userLogin)
router.get("/token", tokenVerification)
router.post("/verify-email", verifyEmail)
router.post("/verify-email-code", verifyEmailCode)

module.exports = router