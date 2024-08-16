
const accountService = require("../services/accounts.service")

// POST: Create an account
const createNewAccount = async(req, res) => {
    try {
        const { name, userId } = req.body;
        if(!name || !userId) 
            return res.json({ error: "Client Error", msg: "Name & UserID are required!" })
        
        const response = await accountService.createAccount(req.body);
        res.json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get an account data
const getAccount = async(req, res) => {
    try {
        const response = await accountService.getAccount(req?.params?.id)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get a user accounts
const getUserAccounts = async(req, res) => {
    try {
        const response = await accountService.getUserAccounts(req?.params?.id)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// PUT: Update an account
const updateAccount = async(req, res) => {
    try {
        const response = await accountService.updateAccount(req?.params?.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// DELETE: Delete an account
const deleteAccount = async(req, res) => {
    try {
        const response = await accountService.deleteAccount(req?.params?.id)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

module.exports = {
    createNewAccount,
    getAccount,
    getUserAccounts,
    updateAccount,
    deleteAccount
}