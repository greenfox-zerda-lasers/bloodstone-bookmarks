const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const users = require('./conf/users.js');
const flash = require('connect-flash');
// const bcrypt = require('bcrypt-nodejs');

const server = function server(db) {
  // ************ Configure app *************

  // Express
  const app = express();
  const myUsers = users(db);

  app.use(express.static('dist'));
  app.use(flash());
  app.use(bodyParser.json());

  // Passport, cookie and session
  app.use(session({
    secret: 'this is the secret',
  }));
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  // Auth function
  const auth = function auth(req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  };

  // ************ Configure PassportJS *************
  // Login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    (email, password, done) => {
      myUsers.lookUpUser(email, (err, user) => {
        if (err) {
          return done(err);
        }
        // user not found
        if (!user) {
          return done(null, false);
        }
        // wrong password
        if (!myUsers.verifyPassword(user, password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));

  // Serialize & deserialize user
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // ************  End points ************

  // USER & SESSION
  // Login
  app.post('/api/login', passport.authenticate('local-login', {
    failureFlash: true,
  }), (req, res) => {
    // Passport puts authenticated user in req.user.
    res.json(req.user.email);
  });

  // Logout
  app.post('/api/logout', (req, res) => {
    req.logOut();
    res.send(200);
  });

  // Loggedin
  app.get('/api/loggedin', (req, res) => {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // Register
  app.post('/api/register', (req, res) => {
    // TODO: Register user method
    const userData = {
      "email": req.body.email || "no email",
      "message": "Success, user registered!"
    };
    res.json(userData);
  });

  // LINKS


  // Post new bookmark
  app.post('/api/bookmarks', (req, res) => {
    // TODO: Save link in DB
    // Success: Reply with saved link
    res.json(req);
  });


  // Return app
  return app;
};

module.exports = server;
