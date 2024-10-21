//imports
//const express = require('express');
import express from 'express';

//rest object
const app = express();

//routes
app.get('/', (req, res) => {
    res.send("<h1>Hi !Welcome to Job -Portal</h1>");
});

//listen
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});