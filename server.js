const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users.js');
const flash = require('connect-flash');

const server = function server(db) {
  // ************ Configure app *************

  const app = express();
  const myUsers = users(db);

  app.use(express.static('dist'));
  app.use(bodyParser.json());

  app.use(passport.initialize());
  app.use(flash());

  // ************ Configure PassportJS *************
  // Login strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    function loginStrategy(email, password, done) {
      // NOTE: userID should be called user
      myUsers.lookUpUser(email, function returnUser(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        } // user not found
        if (!myUsers.verifyPassword(user, password)) {
          return done(null, false);
        } // wrong password
        return done(null, user);
      });
    },
  ));

  // Serialize & deserialize user
  passport.serializeUser(function serializeUser(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function deserializeUser(user, done) {
    done(null, user);
  });

  // ************  End points ************
  // Login
  app.post('/api/login', passport.authenticate('local', {
    failureFlash: true,
  }), function executeLogin(req, res) {
    // Passport puts authenticated user in req.user.
    res.send(req.user.email);
  });

  // Register
  app.post('/api/register', function executeRegister(req, res) {
    const userData = {
      email: req.body.email || 'no email',
      message: 'Success, user registered!',
    };
    res.json(userData);
  });

  return app;
};

module.exports = server;
