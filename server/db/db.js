const queryDb = function (queryText, callback) {
  const pg = require('pg');
  const config = process.env.DATABASE_URL || "pg://postgres:alma@localhost:5432/bloodstone";
  const client = new pg.Client(config);
  // connect to our database
  client.connect(function (err) {
    if (err) {
      callback(err)
    }
    // execute a query on our database
    client.query(queryText, function (err, result) {
      // handling error or invoke callback
      if (err) {
        callback(err);
      } else {
        console.log(result.rows);
        callback(null, result.rows);
      }
      // disconnect the client
      client.end(function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

module.exports = queryDb;
