const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// Use environment variable for MongoDB URI.
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_db_connection_string';
// Connect to MongoDB with error handling
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 5000;
// Start the server and log the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});