'use strict';

const pg = require('pg');

console.log(process.env.PGUSER, process.env.PGDATABASE);

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config = {
  user: 'postgres', //env var: PGUSER
  database: 'bloodstone', //env var: PGDATABASE
  password: 'alma', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

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


queryDb('SELECT * FROM users', console.log;
