const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

// authRoter.get('/login', authHelpers.loginRedirect,(req, res) => {
//     res.render('auth/login', {
//         currentPage: 'login',
//     });
// });

// authRoter.get('/register', authHelpers.loginRedirect, (req,res) => {
//     res.render('auth/register', {
//         currentPage: 'register',
//     });
// });

authRouter.post('/register', usersController.create);
// users submit their login form
authRouter.post('/login', passport.authenticate('local',{
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
    })
);

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = authRouter;