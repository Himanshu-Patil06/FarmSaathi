const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { getRecommendations, getRecommendation } = require('../controllers/recommendationController');

const router = express.Router();


router.get("/", authMiddleware, getRecommendations)
router.get("/:id", authMiddleware, getRecommendation)



module.exports = router;