const router = require("express").Router();
const { createTransaction, getTransactionsByAccount, getTransactionsDonutChart } = require("../controllers/transactions.controller");

router.post("/", createTransaction); // Create new transaction
router.get("/account/:accountId", getTransactionsByAccount); // Get Transactions by Account Id
router.get("/categories/:accountId/donut", getTransactionsDonutChart); // Get Transactions Counts

module.exports = router;