const { createUser, isUserExist } = require("../services/users.services");

// New User SignUp
const userSignUp = async(req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if(!name || !email || !mobile || !password) 
            return res.status(400).json({ error: "Client Error", msg: "Name, Email, Mobile & Password are required!" })

        const response = await createUser(req.body);
        res.status(response?.status).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// User Login


module.exports = {
    userSignUp
}