'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
// const flash           = require('connect-flash');

const users           = require('./db.js');


// ************ Configure app *************
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.use(passport.initialize());
// app.use(flash());


// ************ Configure PassportJS *************

// Login strategy
passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  function (email, password, done) {
    // NOTE: userID should be called user
    users.lookUpUser(email, function (err, user) {
      if (err) {
        console.log('verify', err, user);
        return done(err);
      }
      if (!user) {
        return done(null, false);
      } // user not found
      if (!users.verifyPassword(user, password)) {
        return done(null, false);
      } // wrong password
      return done(null, user);
    });
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
app.post('/api/login', passport.authenticate('local', { failureFlash: true }), function (req, res) {
  // Passport puts authenticated user in req.user.
  res.send(req.user.email);
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
