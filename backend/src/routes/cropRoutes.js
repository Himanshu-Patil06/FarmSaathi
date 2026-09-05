const express = require('express');
const {addCrop,getCrops,getCropById,updateCrop,deleteCrop} = require('../controllers/cropController');

const router = express.Router();

router.post("/",addCrop)

router.get("/",getCrops)

router.get("/:id",getCropById)

router.delete("/:id",deleteCrop)

router.patch("/:id",updateCrop)


module.exports = router;