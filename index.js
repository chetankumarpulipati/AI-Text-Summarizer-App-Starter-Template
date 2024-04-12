const express = require('express');
const app = express();
const port = 3000;

// Import summarizeText function
const summarizeText = require('./summarize');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Set base URL
const baseURL = "https://624be4ac-6251-4542-9422-d52e6ca8c169-00-3pictlhiicl2w.sisko.replit.dev/";

app.post('/submit', async (req, res) => {
  // Assuming the request body contains a 'data' field
  const data = req.body.data;

  try {
    const summary = await summarizeText(data);
    res.status(200).send({ message: 'Summary generated successfully', summary });
  } catch (error) {
    res.status(500).send({ message: 'Error generating summary', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at ${baseURL}:${port}/`);
});
