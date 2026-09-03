const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
    {
        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
            required: true
        },

        stage: {
            type: String,
            required: true
        },

        condition: {
            type: String,
            required: true
        },

        advice: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);