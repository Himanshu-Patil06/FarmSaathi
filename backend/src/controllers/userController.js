const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const weatherService = require('../services/weatherService');

const registerUser = async (req, res) => {
    try {

        const { name, mobile, password, location, language } = req.body

        if (!name || !mobile || !password || !location || !language) {
            return res.status(400).json(
                {
                    message: "ALL Feilds required"
                });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create(
            {
                name,
                mobile,
                password: hash,
                location,
                language
            });
        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                mobile: newUser.mobile,
                location: newUser.location,
                language: newUser.language
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "This mobile number is already registered. Please login instead."
            });
        }
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile });

        if (!user) {
            return res.status(404).json({
                message: "No account found with this mobile number. Please register first."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                location: user.location,
                language: user.language
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const logoutUser = async (req, res) => {
    const user = await User.findById(req.userID);

    if (user?.location?.district) {
        weatherService.clearWeatherCache(user.location.district);
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    res.status(200).json({
        message: "Logout successful"
    });
};

const getUser = async (req, res) => {

    const id = req.userID



    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                location: user.location,
                language: user.language
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    userID = req.userID
    if (id !== userID) {
        return res.status(403).json({ message: "You are not authorized to delete this user" })
    }
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                location: user.location,
                language: user.language
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { registerUser, getUser, loginUser, deleteUser, logoutUser };