const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
    return db.oneOrNone(`
        SELECT * FROM users 
        WHERE username = $1
    `, [userName]);
};

User.create = user => {
    return db.one(`
    INSERT INTO users 
    (username, password_digest, email)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [user.username,user.password_digest, user.email])
};

module.exports = User;