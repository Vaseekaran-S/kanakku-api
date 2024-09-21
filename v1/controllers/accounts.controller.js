
const accountService = require("../services/accounts.service")

// POST: Create an account
const createNewAccount = async (req, res) => {
    try {
        const { name, userId } = req.body;
        if (!name || !userId)
            return res.json({ error: "Client Error", message: "Name & UserID are required!" })

        const response = await accountService.createAccount(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get an account data
const getAccount = async (req, res) => {
    try {
        const response = await accountService.getAccount(req?.params?.id)
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get all accounts
const getAllAccounts = async (req, res) => {
    try {
        const response = await accountService.getAllAccounts()
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get a user accounts
const getUserAccounts = async (req, res) => {
    try {
        const response = await accountService.getUserAccounts(req?.params?.id)
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get a user account by userId and account name
const getUserAccountByName = async (req, res) => {
    try {
        const { userId, accountUrl } = req?.params;
        const response = await accountService.getUserAccountByName(userId, accountUrl);
        res.json(response);
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// PUT: Update an account
const updateAccount = async (req, res) => {
    try {
        const response = await accountService.updateAccount(req?.params?.id, req.body)
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// PATCH: Update account Type
const changeAccountType = async (req, res) => {
    try {
        const { type } = req.body;
        if(!type) return res.json({ type: "error", error: "Data missing", message: "Account Type is not in body" })
        const response = await accountService.changeAccountType(req?.params?.id, type)
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// DELETE: Delete an account
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.json({ message: "Account Id Not Found!", error: "Not Found" })
        const response = await accountService.deleteAccount(id)
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

// DELETE: Delete all account
const deleteAllAccount = async (req, res) => {
    try {
        const response = await accountService.deleteAccounts();
        res.json({ ...response, message: "Account Table Deleted!" })
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.json({ message: "Something went wrong at Server!", error: error?.message })
    }
}

module.exports = {
    createNewAccount,
    getAccount,
    getUserAccounts,
    getAllAccounts,
    getUserAccountByName,
    updateAccount,
    changeAccountType,
    deleteAccount,
    deleteAllAccount
}