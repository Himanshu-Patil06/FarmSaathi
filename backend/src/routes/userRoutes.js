const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { getUser, registerUser, loginUser, deleteUser,logoutUser } = require('../controllers/userController');

const router = express.Router();

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/", authMiddleware, getUser)

router.post("/register", registerUser)

router.delete("/:id", authMiddleware, deleteUser)

module.exports = router;