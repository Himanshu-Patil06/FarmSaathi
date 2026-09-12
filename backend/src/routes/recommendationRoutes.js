const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { getRecomendation } = require('../controllers/recommendationController');

const router = express.Router();


router.get("/", authMiddleware, getRecomendation)


module.exports = router;