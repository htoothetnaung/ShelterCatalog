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

// Check possible build paths
const possiblePaths = [
  path.join(__dirname, 'dist/petfinder-catanddog/browser'),
  path.join(__dirname, 'dist/petfinder-catanddog'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'browser')
];

let staticPath = null;

// Find the first valid path
for (const pathToCheck of possiblePaths) {
  try {
    if (fs.existsSync(pathToCheck) && fs.existsSync(path.join(pathToCheck, 'index.html'))) {
      staticPath = pathToCheck;
      console.log(`Found valid build path: ${staticPath}`);
      break;
    }
  } catch (err) {
    console.log(`Error checking path ${pathToCheck}: ${err.message}`);
  }
}

if (!staticPath) {
  console.error('No valid build path found. Available directories:');
  try {
    const rootFiles = fs.readdirSync(__dirname);
    console.log(`Files in root: ${rootFiles.join(', ')}`);
    
    if (rootFiles.includes('dist')) {
      const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
      console.log(`Files in dist: ${distFiles.join(', ')}`);
    }
  } catch (err) {
    console.error(`Error listing directories: ${err.message}`);
  }
  
  // Default to a path even if not found
  staticPath = path.join(__dirname, 'dist');
}

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
  console.log(`Application available at http://localhost:${port}`);
});