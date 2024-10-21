//imports
//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';

//dot env config
dotenv.config();

//rest object
const app = express();

//routes
app.get('/', (req, res) => {
    res.send("<h1>Hi !Welcome to Job -Portal</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
    console.log("Server is running on ${process.env.DEV_MODE} port 8080"
        
    );
});