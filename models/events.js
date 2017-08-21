const db = require('../db/config');

const Event = {};

Event.findAll = () => {
    return db.query('SELECT * FROM events');
}

//find by id
Event.findById = (id) => {
    return db.oneOrNone(`
    SELECT * FROM events
    WHERE id = $1
    `, [id]);
}

//create event
Event.create = (event) => {
    return db.one(`
    INSERT INTO events
    (title, description, date, time)
    VALUES ($1, $2, $3, $4)
    RETURNING * 
    `, [event.title, event.description, event.date, event.time]);
}

//editing or updating an event
Event.update = (event, id) => {
    return db.one(`
    UPDATE events SET
    title =  $1,
    description = $2,
    date = $3,
    time = $4,
    genre = $5,
    WHERE id = $6
    RETURNING *
    `, [event.title, event.description, event.date, event.time, id])
}

// deleting an event
Event.destroy = (id) => {
    return db.none(`
    DELETE From events
    WHERE id = $1
    `, [id]);
}


module.exports = Event;