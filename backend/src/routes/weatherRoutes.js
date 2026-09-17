const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { getWeather, getWeatherCondition } = require('../controllers/weatherController');




const router = express.Router();

router.get("/", authMiddleware, getWeather);
router.get("/condition", authMiddleware, getWeatherCondition);


module.exports = router;
