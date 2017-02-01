'use strict';

const db = require('./db');
const server = require('./server.js');

const myServer = server(db);

const port = process.env.PORT || 3000;

myServer.listen(port, function () {
  console.log('Server running on port %d', port);
});
