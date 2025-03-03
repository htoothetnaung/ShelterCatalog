const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Check if the build directory exists
const staticPath = path.join(__dirname, 'dist/petfinder-catanddog/browser');
try {
  if (fs.existsSync(staticPath)) {
    console.log(`Static directory exists at: ${staticPath}`);
    const files = fs.readdirSync(staticPath);
    console.log(`Files in directory: ${files.join(', ')}`);
  } else {
    console.error(`Static directory does not exist: ${staticPath}`);
  }
} catch (err) {
  console.error(`Error checking static directory: ${err.message}`);
}

// Serve static files
app.use(express.static(staticPath));

// Handle all routes
app.all('/*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist/petfinder-catanddog/browser/index.html');
  console.log(`Serving index.html for route: ${req.url}`);
  
  // Check if index.html exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, err => {
      if (err) {
        console.error(`Error serving index.html: ${err.message}`);
        res.status(500).send('Error loading application');
      }
    });
  } else {
    console.error(`index.html not found at: ${indexPath}`);
    res.status(404).send('Application files not found. Build may be missing.');
  }
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Application available at http://localhost:${port}`);
});