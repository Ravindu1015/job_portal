// imports
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';

// dot env config
dotenv.config();

// rest object
const app = express(); // Initialize app first

// MongoDB connection
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Job Portal</h1>");
});

// Example POST route for '/api/v1/test/test-post'
app.post('/api/v1/test/test-post', (req, res) => {
    const data = req.body;
    res.json({ message: "POST request received", data });
});

// Test Routes from external file
app.use('/api/v1/test', testRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
    console.log(
        `Server is running on dev mode on port ${PORT}`.bgCyan.white
    );
});
