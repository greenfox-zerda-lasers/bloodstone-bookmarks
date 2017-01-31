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

  function (username, password, done) {

    users.lookUpUser(username), function(user) {
      // if (err) { return done(err); }
      if (!user) { return done(null, false); } // user is false: no user
      if (!users.verifyPassword(user, password)) { return done(null, false); } // pw not ok; same return as above
      return done(null, user); // all ok
    }

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
