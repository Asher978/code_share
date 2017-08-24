const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// instance of express app
const app = express();
const server = require('http').Server(app);
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
server.listen(PORT, () => {
    console.log(`Alive on port ${PORT}`);
});

// socket io setup
const io = require('socket.io')(server);
// array to hold socket connection
const connections = [];

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log('Currently connected: ' + socket.id + ' %s users online', connections.length);
 
  socket.on('disconnect', () => {
    // splicing the index of the disconnected socket
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s users remaining', connections.length);
  });

  socket.on('join room', (data) => {
    socket.join(data.room);
  });

  socket.on('leave room', (data) => {
    socket.leave(data.room);
  });

  socket.on('coding', (data) => {
    socket.broadcast.to(data.room).emit('code', data);
  });

  socket.on('messaging', (data) => {
    io.in(data.room).emit('message', data.message);
    console.log('message: ' + data.message);
  });
});

// adding events routes
const eventRoutes = require('./routes/event-routes');
app.use('/events', eventRoutes);

// routes for meetup and google API
const meetupRoutes = require('./routes/meetup-routes');
app.use('/meetup', meetupRoutes);

