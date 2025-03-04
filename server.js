const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke! Check server logs for details.');
});

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

// Find the correct build path
let staticPath;
try {
  // For Vercel deployment
  if (process.env.VERCEL) {
    staticPath = path.join('dist/petfinder-catanddog/browser');
  } 
  // For Railway deployment
  else if (fs.existsSync('/app/dist')) {
    staticPath = '/app/dist';
  } 
  // Local development
  else {
    staticPath = path.join(__dirname, 'dist/petfinder-cats/browser/');
  }
  
  console.log(`Using static path: ${staticPath}`);
  
  // Check if path exists
  if (!fs.existsSync(staticPath)) {
    console.warn(`Static path not found: ${staticPath}`);
    // Try to find the correct path
    const rootDir = process.env.VERCEL ? __dirname : (process.env.NODE_ENV === 'production' ? '/app' : __dirname);
    console.log(`Looking for build in: ${rootDir}`);
    
    if (fs.existsSync(rootDir)) {
      const files = fs.readdirSync(rootDir);
      console.log(`Files in ${rootDir}: ${files.join(', ')}`);
    }
  }
} catch (error) {
  console.error('Error finding static path:', error);
  staticPath = path.join(__dirname, 'dist');
}

// Serve static files with try/catch
try {
  app.use(express.static(staticPath));
} catch (error) {
  console.error('Error serving static files:', error);
}

// Handle all routes with try/catch
app.all('/*', (req, res) => {
  try {
    const indexPath = path.join(staticPath, 'index.html');
    console.log(`Trying to serve index.html from: ${indexPath}`);
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.warn(`index.html not found at: ${indexPath}`);
      res.status(404).send(`Application files not found. Build may be missing. Checked path: ${staticPath}`);
    }
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).send('Server error occurred');
  }
});

// For Vercel, we need to export the Express app
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For other environments, start the server
  const port = process.env.PORT || 4200;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}