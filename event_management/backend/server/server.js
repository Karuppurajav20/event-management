require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventRouter = require('./route/eventroute'); 

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in the .env file.');
    process.exit(1); 
}

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    });

app.use('/events', eventRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});