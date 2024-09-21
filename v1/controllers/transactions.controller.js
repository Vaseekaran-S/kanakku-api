
const service = require("../services/transacions.service")

// POST: Create a Transaction
const createTransaction = async(req, res) => {
    try{
        const { amount, accountId, userId, category } = req.body;
        console.log(req.body);
        
        if(!amount || !accountId || !userId || !category) return res.json({ message: "Data missing in body!", error: "Client Error" })
        const response = await service.createTransaction(req.body);
        res.json(response);
    }catch(error){
        console.log("ERROR : ", error?.message);
        res.json({ type: "error", message: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get all transactions of an Account
const getTransactionsByAccount = async(req, res) => {
    try{
        const { accountId } = req.params;
        if(!accountId) return res.json({ message: "Data missing in body!", error: "Client Error" });

        const response = await service.getTransactionsByAccount(accountId);
        res.json(response);
    }catch(error){
        console.log("ERROR : ", error?.message);
        res.json({ type: "error", message: "Something went wrong at Server!", error: error?.message })
    }
}

module.exports = {
    createTransaction,
    getTransactionsByAccount
}