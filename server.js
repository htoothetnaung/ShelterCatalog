const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/petfinder-catanddog/browser')));

// Handle Angular routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/petfinder-catanddog/browser/index.html'));
});

// Use PORT from environment or default to 4200 to match local development
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Available routes:');
  console.log('- /petlist (default)');
  console.log('- /dogs, /cats');
  console.log('- /pet/:id, /userpet/:id');
  console.log('- /login, /signup, /userProfile');
  console.log('- /adminLogin, /dashboard');
  console.log('- And other protected routes...');
});