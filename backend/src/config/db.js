const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_URL)
        console.log(`Connected to sever`);

    } catch (error) {
        console.log(error);

    }
}
module.exports = connectDB