const router = require("express").Router();
const { createNewAccount, getAccount, updateAccount, deleteAccount } = require("../controllers/accounts.controller");

router.post("/", createNewAccount) // Create new account
router.get("/", getAccount) // Get an account data
router.put("/", updateAccount) // Update an account
router.delete("/", deleteAccount) //Delete an account data

module.exports = router;