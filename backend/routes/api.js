const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const api = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');
require('dotenv').config();




const fetch = require('node-fetch'); // Import node-fetch to make HTTP requests






api.get('/stocks', async (req, res) => {
  try {
    const apiKey = process.env.POLY_KEY;

    const baseUrl = 'https://api.polygon.io/v2';

    // Define the limit for the number of stocks
    const limit = 100;

    // Extract query parameters from the request
    const { submittedQuery } = req.query;

    // Construct the API endpoint based on the submitted query
    const apiEndpoint = submittedQuery
      ? `/snapshot/locale/us/markets/stocks/tickers/${submittedQuery}?`
      : '/snapshot/locale/us/markets/stocks/tickers?';

    // Construct the complete URL with the limit parameter
    const apiUrl = `${baseUrl}${apiEndpoint}apiKey=${apiKey}&limit=${limit}`;

    // Log the URL being hit
    console.log('URL being hit:', apiUrl);

    // Make the API call to Polygon.io
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response data
    let data = await response.json();

    // Slice the data to limit the number of stocks to 100
    if (data.tickers && data.tickers.length > limit) {
      data.tickers = data.tickers.slice(0, limit);
    }

    // Return the sliced data to the frontend
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = api;

