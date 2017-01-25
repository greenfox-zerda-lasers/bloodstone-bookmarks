'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;


// ************ Configure app *************
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.use(passport.initialize());


// ************ Configure PassportJS *************


// Login strategy
passport.use(new LocalStrategy(
  function (username, password, done) {
    /*
    if (username == password) {
      return done(null, { username: username, password: password });
    }
    return done(null, false, { message: 'ERROR: Unable to log in.'});
    */
    return done(null, { username: username })
  }
));

// Serialize & deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ************ Error handling ************
// catch all errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ************  End points ************
// Login
app.post('/api/login', passport.authenticate('local'), function (req, res) {
  res.send(req.user);
});

// Register
/*
app.post('/api/register', function (req, res) {
  const userData = {
    "email" : req.body.email || "no email",
    "message": "cool, you have registered"
  };
  res.json(userData);
});
*/

module.exports = app;
