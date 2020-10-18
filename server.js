const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
let users = [];

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

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (user) => {
    console.log('New user has just joined: ', socket.id);
    users.push({name: user, id: socket.id});
    console.log('Users: ', users);
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${user} has joined the conversation!`
    });
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    users = users.filter(user => (user.id !== socket.id));
    console.log('users: ', users);
  });

  console.log('I\'ve added a listener on message event \n');
});




