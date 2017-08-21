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
