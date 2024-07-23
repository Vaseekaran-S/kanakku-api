
const router = require("express").Router()
const userRouter = require("../v1/routes/users.routes")

router.use("/users", userRouter)

module.exports = router