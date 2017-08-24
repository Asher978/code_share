const bcrypt =  require('bcryptjs');
const User = require('../../models/user');

// The function that use bcrypt to compare passwords
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRequired(req, res, next) {
    if (!req.user) return res.status(404).json({status:"no user in call"});
    return next();
}

module.exports = {
    comparePass,
    // loginRedirect,
    loginRequired
}