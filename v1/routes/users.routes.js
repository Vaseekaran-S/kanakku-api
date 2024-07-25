const router = require("express").Router()
const { createUser, getUser, updateUser, getUsers, deleteUser, deleteUsers } = require("../controllers/users.controller");

router.get("/", getUsers);
router.delete("/", deleteUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;