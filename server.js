var express = require('express'); //eslint-disable-line
var app = express();
var pg = require('pg');
var sri4node = require('sri4node');
var config = require('./config/config');
var authentication = require('./lib/authentication');
var personen = require('./resources/personen.js')(sri4node);
var functies = require('./resources/functies.js')(sri4node);
var responsibilities = require('./resources/responsibilities.js')(sri4node);
var $u = sri4node.utils;

var verbose = false;
var databaseUrl = config.DATABASE_URL;

sri4node.configure(app, pg, {
  logrequests: true,
  logsql: verbose,
  logdebug: verbose,
  logmiddleware: false,
  defaultdatabaseurl: databaseUrl,
  authenticate: $u.basicAuthentication(authentication.testAuthenticator),
  identify: authentication.getMe,
  resources: [
    personen.resource(),
    functies.resource(),
    responsibilities.resource()
  ]
});

app.set('port', process.env.PORT || 3000); //eslint-disable-line

app.listen(app.get('port'), function () {
  'use strict';
  console.log('lars_poc-rest-prototype is running at localhost:' + app.get('port')); //eslint-disable-line
});
