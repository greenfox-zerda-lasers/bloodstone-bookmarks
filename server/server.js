const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const users = require('./users.js');
const flash = require('connect-flash');
const getTitleAtUrl = require('get-title-at-url');


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
        return done(null, { email: user.email });
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
    myUsers.lookUpUser(req.body.email, (err, user) => {
      if (err) {                  // db connection error
        console.log('err: ', err);
        res.send(err);
      } else if (user) {          // user found
        console.log('the user had registered already: ', user);
        res.send(403);
      } else {                     // send back the registered users email
        myUsers.registerUser(req.body.email, req.body.password, (err, user) => {
          console.log('registered user: ', user);
          req.login(user, (err) => {
            if (err) {
              res.send(err);
            } else {
              res.json(user);
            }
          });
        });
      }
    });
  });

  // BOOKMARKS
  // Post new bookmark
  app.post('/api/bookmarks', (req, res) => {

    var url = req.body.url;
    getTitleAtUrl(url, function(title){

    const bookmarkToSave = {
      url: url,
      title: title,
    }
    res.json(bookmarkToSave);
    });
  });


  // Return app
  return app;
};

module.exports = server;
