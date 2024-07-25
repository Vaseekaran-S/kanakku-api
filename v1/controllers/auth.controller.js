const createUser = require("../services/users.services");

// New User SignUp
const userSignUp = async(req, res) => {
    try {
        const data = req.body;
        
        const response = await createUser(data);
        res.status(200).json(response)
    } catch (error) {
        console.log("ERROR : ", error?.message);
        res.status(500).json({ msg: "Something went wrong at Server!", error: error?.message })
    }
}

// User Login


module.exports = {
    userSignUp
}