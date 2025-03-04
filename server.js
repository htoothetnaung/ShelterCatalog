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

// Find the correct build path
let staticPath;

// Check if we're in Railway (production) or local environment
if (fs.existsSync('/app/dist')) {
  // Railway path
  staticPath = '/app/dist';
} else {
  // Local development path
  staticPath = path.join(__dirname, 'dist/petfinder-cats/browser');
}

// Check if the path exists
if (!fs.existsSync(staticPath)) {
  console.error(`Static path not found: ${staticPath}`);
  // Try to find the correct path
  const rootDir = process.env.NODE_ENV === 'production' ? '/app' : __dirname;
  console.log(`Looking for build in: ${rootDir}`);
  
  if (fs.existsSync(rootDir)) {
    const files = fs.readdirSync(rootDir);
    console.log(`Files in ${rootDir}: ${files.join(', ')}`);
    
    if (files.includes('dist')) {
      const distPath = path.join(rootDir, 'dist');
      const distFiles = fs.readdirSync(distPath);
      console.log(`Files in dist: ${distFiles.join(', ')}`);
      
      // Use the first directory in dist if it exists
      if (distFiles.length > 0) {
        staticPath = path.join(distPath, distFiles[0]);
        if (fs.existsSync(path.join(staticPath, 'browser'))) {
          staticPath = path.join(staticPath, 'browser');
        }
      }
    }
  }
}

console.log(`Serving static files from: ${staticPath}`);

// Serve static files
app.use(express.static(staticPath));

// Handle all routes
app.all('/*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  
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