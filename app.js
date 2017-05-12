var express = require('express');
var users = require('./app/controller/user-controller');
var vg = express();
vg.use('/api', users);
vg.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
module.exports = vg;
vg.listen(80);
console.log("vg is started and listening");
