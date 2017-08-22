const express = require('express');
const authRoter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

authRoter.get('/login', authHelpers.loginRedirect,(req, res) => {
    res.render('auth/login', {
        currentPage: 'login',
    });
});

authRoter.get('/register', authHelpers.loginRedirect, (req,res) => {
    res.render('auth/register', {
        currentPage: 'register',
    });
});

authRoter.post('/register', usersController.create);