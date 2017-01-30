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
  { usernameField: "email", passwordField: "password" },
  function (username, password, done) {
    if (username == password) {
      return done(null, { message: "kiscica" });
    }
    return done(null, false, { message: 'ERROR: Unable to log in.'});
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
  console.log('authenticating');
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
