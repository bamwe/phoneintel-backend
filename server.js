// Import the libraries we installed
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Create our server
const app = express();
const PORT = 3000;

// Middleware - allows our server to understand JSON data
app.use(cors());
app.use(express.json());

// Test route - to check if server is working
app.get('/', (req, res) => {
  res.json({ message: 'PhoneIntel API is running!' });
});

// Phone lookup endpoint - this is what your frontend will call
app.post('/api/lookup-phone', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // For now, we'll return demo data
    // Later, we'll call real APIs here
    const demoData = {
      number: phoneNumber,
      carrier: 'MTN Uganda',
      country: 'Uganda',
      valid: true,
      socialMedia: [
        { platform: 'WhatsApp', found: true },
        { platform: 'Facebook', found: true }
      ],
      riskScore: 35
    };
    
    res.json(demoData);
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Email lookup endpoint
app.post('/api/lookup-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Demo data for now
    const demoData = {
      email: email,
      valid: true,
      provider: 'Gmail',
      breaches: 2,
      riskScore: 28
    };
    
    res.json(demoData);
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Test it by visiting: http://localhost:${PORT}`);
});
