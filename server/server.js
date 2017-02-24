const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const users = require('./users.js');
const bookmarks = require('./bookmarks.js');
const flash = require('connect-flash');
const title = require('url-to-title');
const validUrl = require('valid-url');
const bcrypt = require('bcrypt-nodejs');

const server = function server(db) {
  // ************ Configure app *************

  // Express
  const app = express();
  const myUsers = users(db);
  const myBookmarks = bookmarks(db);

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
      res.sendStatus(401);
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
        if (!user[0]) {
          return done(null, false);
        }
        // wrong password
        if (!bcrypt.compareSync(password, user[0].password)) {
          return done(null, false);
        }
        return done(null, { email: user[0].email });
      });
    }
  ));

  // Serialize & deserialize user NOTE: still dont know what it does
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
    res.status(200).json(req.user.email);
  });

  // Logout
  app.post('/api/logout', (req, res) => {
    req.logOut();
    res.sendStatus(200);
  });

  // Loggedin
  app.get('/api/loggedin', (req, res) => {
    res.status(200).json(req.isAuthenticated() ? req.user : '0');
  });

  // Register
  app.post('/api/register', (req, res) => {
    myUsers.lookUpUser(req.body.email, (err, user) => {
      if (err) {                  // db connection error
        console.log('err: ', err);
        res.status(500).json({ error: err });
      } else if (user[0]) {          // user found
        console.log('the user had registered already: ', user[0]);
        res.sendStatus(403);
      } else {                     // send back the registered users email
        myUsers.registerUser(req.body.email, bcrypt.hashSync(req.body.password), (err, user) => {
          req.login(user[0], (err) => {
            if (err) {
              res.status(500).json({ error: err });
            } else {
              console.log('registered user: ', user[0]);
              res.json(user[0]);
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
    let bookmarkToSave = {};
    if (validUrl.isUri(url)) {
      title(url, function(err, title) {
        if(!err){
          if(title.length > 120){
            title = title.substring(0, 120);
          }
        bookmarkToSave = {
          url: url,
          title: title,
        };
        }
      // Async call to get user ID based on current email
        myUsers.getUserID(req.user.email, (err, userID) => {
          if (err) {
            console.log('err: ', err);
            res.status(500).json({ error: err });
          } else {
            myBookmarks.saveBookmark(
              userID[0].user_id, bookmarkToSave.url, bookmarkToSave.title, (err, url) => {
                if (err) {
                  console.log('err: ', err);
                  res.status(500).json({ error: err });
                } else {
                  res.sendStatus(200);
                }
              });
          }
        });
      });
    } else {
      const err = new Error('not a valid url')
      res.status(500).json({ error: err });
    }
  });

  app.get('/api/bookmarks', (req, res) => {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
    } else {
      myUsers.getUserID(req.user.email, (err, userID) => {
        if (err) {
          console.log('err: ', err);
          res.status(500).json({ error: err });
        } else {
          console.log(userID);
          myBookmarks.getList(userID[0].user_id, (err, data) => {
            res.json(data);
          });
        }
      });
    }
  });

  // Return app
  return app;
};

module.exports = server;
