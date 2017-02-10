'use strict';

const db = require('./server/db/db');
const server = require('./server/server.js');

const myServer = server(db);

const port = process.env.PORT || 3000;

myServer.listen(port, () => {
  console.log('Server running on port %d', port);
});
