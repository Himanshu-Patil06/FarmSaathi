const mongoose = require("mongoose");

const farmerCropSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
            required: true
        },

        plantingDate: {
            type: Date,
            required: true
        },

        
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("FarmerCrop", farmerCropSchema);