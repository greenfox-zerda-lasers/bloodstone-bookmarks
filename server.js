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
        "title":"Index.hu",
        "url":"http://index.hu"
      },
      {
        "title":"Szanalmas.hu",
        "url":"http://szanalmas.hu"
      },
      {
        "title":"Angular",
        "url":"https://docs.angularjs.org"
      },
      {
        "title":"BloodStone",
        "url":"http://bloodstonedevelopment.tk/"
      }
    ]
  };
  res.json(userData);
})


   module.exports = app;
