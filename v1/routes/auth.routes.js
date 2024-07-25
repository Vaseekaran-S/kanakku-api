const router = require("express").Router()
const { userSignUp } = require("../controllers/auth.controller")

router.post("/", userSignUp)

module.exports = router