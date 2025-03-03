const express = require('express');
const path = require('path');
const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/petfinder-catanddog/browser')));

// Handle all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/petfinder-catanddog/browser/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});