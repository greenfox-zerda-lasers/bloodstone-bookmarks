'use strict';

const pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present


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
      callback(result.rows[0]);
    });
  });
};


queryDb('SELECT * FROM users', console.log);
