// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes'); // Import routes
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/notes', noteRoutes); // Use note routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});