// Import necessary modules
const express = require('express');  // Express framework for creating the server
const cors = require('cors');       // CORS middleware for handling cross-origin requests
const fs = require('fs');           // File system module to read/write files

// Initialize Express application
const app = express();
const port = 2000; // Port number on which the server will listen

// Middleware setup
app.use(cors());  // Enable CORS for all routes (necessary if your front-end and back-end are on different origins)
app.use(express.json());  // Enable parsing of JSON bodies in requests

// File where click counts will be stored
const clickCountFile = 'clickCounts.json';

// Route to handle POST requests on '/click'
app.post('/click', (req, res) => {
  const buttonName = req.body.button;  // Extract button name from request body
  updateClickCount(buttonName);        // Update the click count for the specified button
  res.send(`Clicked ${buttonName}`);   // Send a response back to the client
});

// Function to update the click count in the text file
function updateClickCount(buttonName) {
  let counts = {};
  // Check if the click count file exists
  if (fs.existsSync(clickCountFile)) {
    // Read the existing counts from the file
    const data = fs.readFileSync(clickCountFile, 'utf8');
    counts = JSON.parse(data);  // Parse the JSON string into an object
  }
  // Increment the count for the specified button
  counts[buttonName] = (counts[buttonName] || 0) + 1;
  // Write the updated counts back to the file
  fs.writeFileSync(clickCountFile, JSON.stringify(counts));
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
