//imports
//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';

//dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//routes
app.use('/api/v1/test' , testRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(
        'Server is running on ${process.env.DEV_MODE}Mode on port ${PORT}'
        .bgCyan.white
    );
});