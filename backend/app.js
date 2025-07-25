const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db'); // Import the db connection

const app = express();
const path = require('path');

// Serve static frontend build files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For any unmatched routes, serve the frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
   }
   console.log('Connected to MySQL Database');
});

// Add your routes here
app.use('/api', routes);

module.exports = app;
