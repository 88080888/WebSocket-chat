const express = require('express');
const path = require('path');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname + '/client')));

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/style.css'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/app.js'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});



app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});