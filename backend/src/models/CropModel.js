const mongoose = require("mongoose");

const cropStageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        startDay: {
            type: Number,
            required: true
        },

        endDay: {
            type: Number,
            required: true
        },

        recommendations: [
            {
                type: String
            }
        ]
    },
    {
        _id: false
    }
);

const cropSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        stages: [cropStageSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Crop", cropSchema);