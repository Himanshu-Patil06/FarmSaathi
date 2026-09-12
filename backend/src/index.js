const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes')
const cropRoutes = require('./routes/cropRoutes')
const weatherRoutes = require('./routes/weatherRoutes')
const recommendationRoutes = require('./routes/recommendationRoutes')

require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoutes)
app.use("/crop", cropRoutes)
app.use("/weather", weatherRoutes)
app.use("/recommendation", recommendationRoutes)


connectDB()

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
})