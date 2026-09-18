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

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoutes)
app.use("/crop", cropRoutes)
app.use("/weather", weatherRoutes)
app.use("/recommendation", recommendationRoutes)


connectDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})