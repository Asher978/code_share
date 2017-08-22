const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// instance of express app
const app = express();
// requiring .env file
require('dotenv').config();

//all the middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

//port setup
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Alive on port ${PORT}`);
});

// socket io setup
// array to hold socket connection
const connections = [];

const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  socket.once('disconnect', () => {
    // splicing the index of the disconnected socket
    socket.disconnect();
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s users remaining', connections.length);
  });

  connections.push(socket);
  connections.map((socket) => {
    console.log('Currently connected: ' + socket.id);
  });

  socket.once('room', (data) => {
    socket.join(data.room);
    console.log(socket.id + ' has joined Room ' + data.room);
  });

  socket.once('leave room', (data) => {
    socket.leave(data.room);
    console.log(socket.id + ' has left Room ' + data.room);
  });

  socket.on('code room', (data) => {
    socket.broadcast.to(data.room).emit('coding', data);
  });
});

// adding events routes
const eventRoutes = require('./routes/event-routes');
app.use('/events', eventRoutes);

// routes for meetup and google API
const meetupRoutes = require('./routes/meetup-routes');
app.use('/meetup', meetupRoutes);

