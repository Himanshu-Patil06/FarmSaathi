const FarmerCrop = require('../models/FarmerCropModel');
const User = require('../models/UserModel');

const Recommendation = require('../models/RecommendationModel')
const CurrentStage = require('../services/cropStage')
const weatherService = require('../services/weatherService')


const getRecommendations = async (req, res) => {
    try {
        const farmer = req.userID

        const user = await User.findById(farmer);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const location = user.location.district;
        const conditions = await weatherService.getWeatherCondition(location)
        const conditionNames = conditions.map(
            item => item.condition
        );

        const crops = await FarmerCrop.find({ farmer }).populate("crop");




        const result = [];

        for (const item of crops) {




            const currentStage = CurrentStage.getCurrentStage(
                item.crop,
                item.plantingDate
            );

            const recommendation = await Recommendation.find({
                crop: item.crop._id,
                stage: currentStage.stage,
                condition: { $in: conditionNames }
            })
            result.push({
                crop: item.crop.name,

                stage: currentStage.stage,

                conditions: conditions,

                recommendations: recommendations
            });
        }

        res.status(200).json(result);


    } catch (error) {
        res.status(500).json({ message: error.message })
    }




}

const getRecommendation = async (req, res) => {

    try {
        const { id } = req.params;
        const farmer = req.userID;


        const user = await User.findById(farmer);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const crop = await FarmerCrop.findOne({
            _id: id,
            farmer: farmer
        }).populate("crop");

        if (!crop) {
            return res.status(404).json({
                message: "Crop not found"
            });
        }


        const location = user.location.district;

        const conditions = await weatherService.getWeatherCondition(location);
        const conditionNames = conditions.map(
            item => item.condition
        );

        const currentStage = CurrentStage.getCurrentStage(
            crop.crop,
            crop.plantingDate
        );


        const recommendations = await Recommendation.find({
            crop: crop.crop._id,
            stage: currentStage.stage,
            condition: { $in: conditionNames }
        });

        res.status(200).json({
            crop: crop.crop.name,
            stage: currentStage.stage,
            conditions: conditions,
            recommendations: recommendations
        });

    } catch (error) {

        console.error("Recommendation error:", error);

        res.status(500).json({
            message: "Failed to get recommendations"
        });
    }
};
module.exports = { getRecommendations, getRecommendation }