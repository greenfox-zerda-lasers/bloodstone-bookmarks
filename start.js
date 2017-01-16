'use strict';

var server = require('./server.js');
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server running on port %d', port);
});
