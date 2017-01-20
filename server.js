'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('dist'));

app.use(bodyParser.json());




app.post('/login', function (req, res) {
  
  const userData = {
    "email" : req.body.email || "no email",
    "links": [
      {
        "Title":"Index.hu",
        "URL":"http://index.hu"
      },
      {
        "Title":"Szanalmas.hu",
        "URL":"http://szanalmas.hu"
      },
    ]
  };
  res.json(userData);
})


   module.exports = app;
