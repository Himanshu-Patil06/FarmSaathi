const User = require('../models/UserModel');
const weatherService = require('../services/weatherService')
const getWeather = async (req, res) => {
    

    const id = req.userID;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const location = user.location.district;
        const weather = await weatherService.getWeather(location);
        res.status(200).json(weather);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


module.exports = { getWeather }