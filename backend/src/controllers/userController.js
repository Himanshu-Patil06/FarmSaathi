const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

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
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile })
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "worng password" })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getUser = async (req, res) => {
    const {id} = req.params.id;


    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { registerUser, getUser, loginUser, deleteUser };