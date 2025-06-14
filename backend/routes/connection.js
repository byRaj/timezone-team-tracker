
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Test MongoDB connection
router.get('/test-connection', async (req, res) => {
  try {
    // Test the connection
    await mongoose.connection.db.admin().ping();
    
    res.json({
      success: true,
      message: 'MongoDB connection successful',
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    res.status(500).json({
      success: false,
      message: 'MongoDB connection failed',
      error: error.message
    });
  }
});

module.exports = router;
