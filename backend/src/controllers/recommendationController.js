const FarmerCrop = require('../models/FarmerCropModel');
const User = require('../models/UserModel');

const Recommendation = require('../models/RecommendationModel')
const CurrentStage = require('../services/cropStage')
const weatherService = require('../services/weatherService')


const getRecomendation = async (req, res) => {
    try {
        const farmer = req.userID

        const user = await User.findById(farmer);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const location = user.location.district;
        const conditions = await weatherService.getWeatherCondtion(location)

        const crops = await FarmerCrop.find({ farmer }).populate("crop");
        const result = [];
        for (const item of crops) {



            const currentStage = CurrentStage.getCurrentStage(
                item.crop,
                item.plantingDate
            );

            const recommendation = await Recommendation.find({
                crop: item.crop._id,
                stage: currentStage,
                condition: { $in: conditions }
            })
            result.push({
              
                recommendation
            });
        }

        res.status(200).json(result);


    } catch (error) {
        res.status(500).json({ message: error.message })
    }




}

module.exports = { getRecomendation }