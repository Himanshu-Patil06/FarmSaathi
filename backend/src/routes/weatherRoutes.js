const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { getWeather } = require('../controllers/weatherController');



const router = express.Router();

router.get("/", authMiddleware, getWeather);

module.exports = router;
