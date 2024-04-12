const axios = require('axios');

async function summarizeText(text) {
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // assuming you have access to process.env here
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log("Response from API:", response.data); // Log the entire response data
    // Now, let's check the structure of response.data to access the summary text properly

    // Example of accessing summary text if the response structure is an array with objects
    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error("Unable to extract summary text from response");
    }
  } catch (err) {
    console.log(err);
    throw err; // rethrow the error to handle it in index.js
  }
}

module.exports = summarizeText;
