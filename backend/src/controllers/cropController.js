const FarmerCrop = require('../models/FarmerCropModel');

const addCrop = async (req, res) => {

    try {
        const { crop, plantingDate } = req.body;
        const farmer = req.userID
        const farmerCrop = await FarmerCrop.create({
            farmer,
            crop,
            plantingDate
        })
        res.status(201).json(farmerCrop)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCrops = async (req, res) => {

    try {
        const crops = await FarmerCrop.find({ farmer: req.userID });

        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getCropById = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await FarmerCrop.findOne({
            _id: id,
            farmer: req.userID
        });

        if (!crop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        res.status(200).json(crop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateCrop = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCrop = await FarmerCrop.findByIdAndUpdate(
            {
                _id: id,
                farmer: req.userID
            },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCrop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        res.status(200).json(updatedCrop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCrop = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCrop = await FarmerCrop.findByIdAndDelete({
            _id: id,
            farmer: req.userID
        });

        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        res.status(200).json({ message: "Crop deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addCrop, getCrops, getCropById, updateCrop, deleteCrop };