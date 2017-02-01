'use strict';

const pg = require('pg');

const config = process.env.DATABASE_URL || "pg://postgres:alma@localhost:5432/bloodstone";

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools

const queryDb = function (queryText, callback) {
  const client = new pg.Client(config);

  // connect to our database
  client.connect(function (err) {
    if (err) throw err;

    // execute a query on our database
    client.query(queryText, function (err, result) {
      if (err) throw err;

      // disconnect the client
      client.end(function (err) {
        if (err) throw err;
      });
      // callback
      callback(null, result.rows[0]);
    });
  });
};

// checkUsers
const users = (function () {
  const lookUpUser = function (email, success) {
    queryDb(`SELECT * FROM users WHERE EMAIL = '${email}'`, success);
  };

  const verifyPassword = function (user, password) {
    // NOTE: I know user exists. Need to check pw.
    return (user.password === password)
  };
  //   // NOTE: No error case, no DB connection.

  return {
    lookUpUser: lookUpUser,
    verifyPassword: verifyPassword,
  }
})();

module.exports = users;
// getBookmarks...
