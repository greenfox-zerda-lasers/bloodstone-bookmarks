'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;

const users           = require('./users.js');


// ************ Configure app *************
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.use(passport.initialize());


// ************ Configure PassportJS *************

// Login strategy
passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },

  function (email, password, done) {

    // if (err) { return done(err); } NOTE: No DB error handling
    if (!users.lookUpUser(email)) { return done(null, false); } // user not exists
    if (!users.verifyPassword(email, password)) { return done(null, false); } // pw not ok; same return as above
    return done(null, email); // all ok

    /*
    // Not segmented enough:
    if (users.lookUpUser(username, password)) {
      return done(null, { message: "User found, logging in." });
    }
    return done(null, false, { message: 'ERROR: Unable to log in.'});
    */
    }
));

// Serialize & deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// ************  End points ************
// Login
app.post('/api/login', passport.authenticate('local'), function (req, res) {
  console.log('Express: Authenticating done.');
  res.send(req.user);
});

// Register
app.post('/api/register', function (req, res) {
  const userData = {
    "email" : req.body.email || "no email",
    "message": "Success, user registered!"
  };
  res.json(userData);
});


module.exports = app;
