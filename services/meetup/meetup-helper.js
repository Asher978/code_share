require('isomorphic-fetch');
require('dotenv').config();

// API_KEYS being fetched from .env file
const GOOG_API_KEY = process.env.GOOG_API_KEY;
const meet_API_KEY = process.env.meet_API_KEY;

// getting lng & lat from GOOGLE API
let getLngLat = (req, res, next) => {
    console.log('Hello from meetupHelpers :))')
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${req.body.ZIP}&key=${GOOG_API_KEY}`)
    .then(fetchRes => {
        return fetchRes.json();
        next();
    }).then(jsonRes => {
        res.locals.lat = jsonRes.results[0].geometry.location.lat;
        res.locals.lng = jsonRes.results[0].geometry.location.lng;
        next();
    }).catch(err => {
        console.log(err);
        next();
    })
}

// Passing in lng & lat from GOOGLE-API to MEETUP-API to fetch the events
let eventsFromMeetup = (req, res, next) => {
    console.log(res.locals.lat,'--->from meetupfunction')
    fetch(`https://api.meetup.com/find/events?photo-host=public&text=javascript&sig_id=52387182&lon=${res.locals.lng}&lat=${res.locals.lat}&key=${meet_API_KEY}`)
    .then(fetchRes => {
        return fetchRes.json();
        next();
    }).then(jsonRes => {
        console.log(jsonRes)
        res.locals.events = jsonRes;
        next()
    }).catch(err => console.log(err));
}


module.exports = { getLngLat, eventsFromMeetup }