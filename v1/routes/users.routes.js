const router = require("express").Router()
const { createUser, getUser, updateUser, getUsers, deleteUser, deleteUsers } = require("../controllers/users.controller");

router.get("/", getUsers); // Get All Users
router.delete("/", deleteUsers); // Delete All Users
router.post("/", createUser); // Create a User
router.get("/:id", getUser); // Get a user Data
router.put("/:id", updateUser); // Update a user Data
router.delete("/:id", deleteUser); // Soft Delete a user Data

module.exports = router;