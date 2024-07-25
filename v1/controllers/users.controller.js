
const userService = require("../services/users.services")

// GET: Get all Users Data
const getUsers = async(req, res) => {
    try {
        const response = await userService.getUsers();
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// DELETE: Delete all Users Data
const deleteUsers = async(req, res) => {
    try {
        const response = await userService.deleteUsers();
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// GET: Get a User Data
const getUser = async(req, res) => {
    try {
        const response = await userService.getUser(req?.params?.id)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// POST: Create New User
const createUser = async(req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if(!name || !email || !mobile || !password) 
            return res.status(400).json({ msg: "Client Error", error: "Name, Email, Mobile & Password are required!" })

        if(await userService.userExist(email)){
            return res.status(409).json({ msg: "This Email Id is already used!" })
        }
        const response = await userService.createUser(req.body);
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// PUT: Update a User Data
const updateUser = async(req, res) => {
    try {
        const response = await userService.updateUser(req?.params?.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// DELETE: Delete a User Data
const deleteUser = async(req, res) => {
    try {
        const response = await userService.deleteUser(req?.params?.id)
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    deleteUsers
}