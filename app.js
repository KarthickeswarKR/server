var express = require('express');
var log4js = require('log4js');
var logger = require('morgan');
var auditLog = require('audit-log');
var passport = require('passport');
var bodyParser = require('body-parser');
var auditLog = require('audit-log');
var fs = require('fs');
var auth=require('./app/auth/auth');
var config = require('./app/config/config');
var mongoose = require('mongoose');
var material = require('./app/controllers/materialcontroller');
var token = require('./app/controllers/tokencontroller');
var user = require('./app/controllers/user-controller');
var unit = require('./app/controllers/unitcontroller');
var brand = require('./app/controllers/brandcontroller');
var stockarea = require('./app/controllers/stockareacontroller');
var productstock = require('./app/controllers/productstockcontroller');
var product = require('./app/controllers/productcontroller');
var sell = require('./app/controllers/sellcontroller');
var variant = require('./app/controllers/variantcontroller');
var order = require('./app/controllers/ordercontroller');
var db = require('./app/db/mongoose');
var config = require('./app/config/config');
var logconfig=require('./app/config/logconfig');
var vg = express();
var app = process.cwd() + '/app/';
require(app + '/auth/auth');
var port = process.env.PORT|| config.get('port');
vg.use(passport.initialize());
var oauth2 = require(app + '/auth/Oauth2');
var api = require('./app/routes/api');
//var busboyBodyParser = require('busboy-body-parser');
log4js.configure("log4js.json");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
var log = log4js.getLogger('app');
var html        =   require('./html.js');
vg.use('/',log4js.connectLogger(log4js.getLogger("/"), { level: 'auto' }));
vg.use(logger('combined', {stream: accessLogStream}));
vg.use(bodyParser.json());
vg.use(bodyParser.urlencoded({ extended: false }));
vg.use(logger('dev'));
vg.use('/', express.static(__dirname + '/dist'));
vg.use('/api/auth',auth);
vg.use('/api/unit', unit);
vg.use('/api/orders', order);
vg.use('/api/material', material);
vg.use('/api/brand', brand);
vg.use('/api/stockarea', stockarea);
vg.use('/api/product', product);
vg.use('/api/productstock', productstock);
vg.use('/api/variant', variant);
vg.use('/api/oauth/token',oauth2.token);
vg.use('/api/token',token);
vg.use('/api/users',user);
vg.use('/api/sell',sell);

vg.use('/*',html);
vg.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// error handlers

/**
 * Error Handling for Dev/Local env
 */
if (vg.get('env') === 'development') {
  vg.use(function(err, req, res, next) {
    res.status(err.status || 500);
        log.error("error",err);
    res.send({name:err.name,message : err.message,status:err.statusCode,errorCode : err.errorCode});
  });
}

/**
 * Error Handling for production
 * No error log will show to user
 */
vg.use('/',function(err, req, res, next) {
	if(err.status == 403){
		res.status(403);
        console.error("error",err);
		res.send({result:"error",message : "Unauthorized",status:403});
	}else{
	res.status(err.status || 500);
      console.error("error",err);
  res.send({result:"error",message : err.message,status:err.status});
}
});
module.exports = vg;

console.log(port);
vg.listen(port);
console.log("vg is started and listening");
