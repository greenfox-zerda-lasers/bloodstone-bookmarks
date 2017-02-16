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
      if (err) {
        callback(err);
        console.log('db conn err');
      }

      // disconnect the client
      client.end(function (err) {
        if (err) {
          callback(err);
          console.log('db conn end err');
        }
      });
      // callback
      console.log('callback');
      callback(null, result.rows[0]);
    });
  });
};

module.exports = queryDb;
