
const router = require("express").Router()
const authRouter = require("../v1/routes/auth.routes")
const userRouter = require("../v1/routes/users.routes")

router.use("/auth", authRouter)
router.use("/users", userRouter)

module.exports = router