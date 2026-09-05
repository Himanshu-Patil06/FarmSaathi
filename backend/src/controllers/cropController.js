const FramerCrop = require('../models/FarmerCropModel');

const addCrop = async (req, res) => {

    try {
        const { framer, crop, plantingDate } = req.body;
        const framerCrop = await FramerCrop.create({
            framer,
            crop,
            plantingDate
        })
        res.status(201).json(framerCrop)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCrops = async (req, res) => {

    try {
        const crops = await FramerCrop.find();

        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getCropById = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await FramerCrop.findById(id);

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
        const updatedCrop = await FramerCrop.findByIdAndUpdate(
            id,
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
        const deletedCrop = await Crop.findByIdAndDelete(id);

        if (!deletedCrop) {
            return res.status(404).json({ message: "Crop not found" });
        }

        res.status(200).json({ message: "Crop deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addCrop, getCrops, getCropById, updateCrop, deleteCrop };