const bcrypt = require = require('bcryptjs');
const User = require('../../models/user');

// The function that use bcrypt to compare passwords
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}