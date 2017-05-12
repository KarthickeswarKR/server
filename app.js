var express = require('express');
var users = require('./app/controller/user-controller');
var vg = express();
var config = require('./app/config/config');
var vg = express();
var port = process.env.PORT|| config.get('port');
vg.use('/api', users);
vg.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
module.exports = vg;
vg.listen(port);
console.log("vg is started and listening");
