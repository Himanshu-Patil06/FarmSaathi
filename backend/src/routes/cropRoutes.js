const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { addCrop, getCrops, getCropById, updateCrop, deleteCrop } = require('../controllers/cropController');

const router = express.Router();

router.post("/", authMiddleware, addCrop)

router.get("/", authMiddleware, getCrops)

router.get("/:id", authMiddleware, getCropById)

router.delete("/:id", authMiddleware, deleteCrop)

router.patch("/:id", authMiddleware, updateCrop)


module.exports = router;