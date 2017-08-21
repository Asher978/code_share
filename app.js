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
app.use(express.static('./client/node_modules/bootstrap/dist'));

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
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s users remaining', connections.length);
  });

  connections.push(socket);
  connections.map((socket) => {
    console.log('Currently connected: ' + socket.id);
  });
});

