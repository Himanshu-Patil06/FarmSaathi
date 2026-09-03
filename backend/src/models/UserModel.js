const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        location: {
            village: {
                type: String,
                required: true,
                trim: true
            },

            district: {
                type: String,
                required: true,
                trim: true
            },

            state: {
                type: String,
                required: true,
                trim: true
            }
        },

        language: {
            type: String,
            enum: ["en", "mr", "hi"],
            default: "mr"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);