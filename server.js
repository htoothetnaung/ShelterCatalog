const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/petfinder-catanddog/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/petfinder-catanddog/browser/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});