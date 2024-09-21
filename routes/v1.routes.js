const router = require("express").Router()

const authRouter = require("../v1/routes/auth.routes")
const userRouter = require("../v1/routes/users.routes")
const accountRouter = require("../v1/routes/accounts.routes")
const transactionRouter = require("../v1/routes/transactions.routes")

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/accounts", accountRouter)
router.use("/transactions", transactionRouter)

module.exports = router