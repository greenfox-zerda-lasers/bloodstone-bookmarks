'use strict';

const db = require('./db');

const server = require('./server.js');

const myServer = server(db);

var port = process.env.PORT || 3000;

console.log(myServer.app);

myServer.app.listen(port, function () {
  console.log('Server running on port %d', port);
});
