var express = require('express');
var users = require('./app/controller/user-controller');
var vg = express();

vg.use('/api', users);
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
vg.listen(80);
console.log("vg is started and listening");
