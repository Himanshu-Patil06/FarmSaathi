const express = require('express');
const { getUser, registerUser, loginUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post("/login", loginUser)

router.get("/:id", getUser)

router.post("/registor", registerUser)

router.delete("/:id", deleteUser)

module.exports = router;