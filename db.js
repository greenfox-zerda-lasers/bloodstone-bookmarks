const queryDb = function (queryText, callback) {
  const pg = require('pg');
  const config = process.env.DATABASE_URL || "pg://postgres:alma@localhost:5432/bloodstone";
  const client = new pg.Client(config);

  // connect to our database
  client.connect(function (err) {
    if (err) {
      callback(err)
    };

    // execute a query on our database
    client.query(queryText, function (err, result) {
      if (err) {
        callback(err)
      }

      // disconnect the client
      client.end(function () {
        if (err) throw err;
      });
      // callback
      callback(null, result.rows[0]);
    });
  });
};

// queryDb(`SELECT * FROM users WHERE EMAIL = 'a@a.hu'`, console.log);


module.exports = queryDb;
