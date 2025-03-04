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

// The correct path based on your folder structure
const staticPath = path.join(__dirname, 'dist/petfinder-cats/browser');
console.log(`Serving static files from: ${staticPath}`);

// Serve static files
app.use(express.static(staticPath));

// Handle all routes
app.all('/*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  console.log(`Serving index.html for route: ${req.url}`);
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`Application files not found. Build may be missing. Checked path: ${staticPath}`);
  }
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});