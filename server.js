// Import the libraries we installed
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Create our server
const app = express();
const PORT = process.env.PORT || 3000;

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
    
    // Call Numverify API for REAL data
    const numverifyResponse = await axios.get(
      `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${phoneNumber}`
    );
    
    const data = numverifyResponse.data;
    
    // Return REAL data from API
    const result = {
      number: phoneNumber,
      valid: data.valid,
      carrier: data.carrier || 'Unknown',
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || '',
      lineType: data.line_type || 'Unknown',
      location: data.location || 'Unknown',
      
      // Still demo for social media (we'll add real APIs later)
      socialMedia: [
        { platform: 'WhatsApp', found: true },
        { platform: 'Facebook', found: true }
      ],
      riskScore: 35
    };
    
    res.json(result);
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      error: 'Lookup failed',
      message: error.message 
    });
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
      riskScore: 28,
      socialMedia: [
        { platform: 'GitHub', found: true },
        { platform: 'LinkedIn', found: true }
      ]
    };
    
    res.json(demoData);
    
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Test it by visiting: http://localhost:${PORT}`);
});