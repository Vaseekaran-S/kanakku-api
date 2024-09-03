const router = require("express").Router();
const { createNewAccount, getAccount, updateAccount, deleteAccount, getAllAccounts, getUserAccounts, deleteAllAccount } = require("../controllers/accounts.controller");

router.post("/", createNewAccount) // Create new account
router.get("/", getAllAccounts) // Get all account data
router.get("/:id", getAccount) // Get an account data
router.get("/user/:id", getUserAccounts) // Get a user account data
router.put("/:id", updateAccount) // Update an account
router.delete("/:id", deleteAccount) //Delete an account data
router.delete("/", deleteAllAccount) //Delete all accounts data


module.exports = router;