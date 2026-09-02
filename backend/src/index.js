const express = require('express');
const cors = require('cors');

require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());

app.get("/", (req, res) => {

})
 connectDB()

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
})