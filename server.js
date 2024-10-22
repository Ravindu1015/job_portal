//imports
//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

//dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//routes
app.get('/', (req, res) => {
    res.send("<h1>Hi !Welcome to Job -Portal</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log(
        'Server is running on ${process.env.DEV_MODE}Mode on port ${PORT}'
        .bgCyan.white
    );
});