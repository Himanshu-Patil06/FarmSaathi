const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes)

connectDB()

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
})