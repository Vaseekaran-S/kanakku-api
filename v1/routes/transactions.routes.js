const router = require("express").Router();
const { createTransaction, getTransactionsByAccount } = require("../controllers/transactions.controller");

router.post("/", createTransaction); // Create new transaction
router.get("/account/:accountId", getTransactionsByAccount); // Create new transaction

module.exports = router;