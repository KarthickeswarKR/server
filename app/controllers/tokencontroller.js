/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var commonService = require("../common/commonService.js");
var tokenservice = require('../services/tokenservice');
var log = require('log4js').getLogger("token controller");
router.get('/checktoken', function(req, res, next) {
    log.debug("{'userId':"+req.body.userId+",'Message':'in token validator'"+",'Url':"+req.originalUrl+"}");
    tokenservice.tokenvalidator(req, res);
});
router.get('/logout',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
  var validator=requestValidator.logoutvalidator(req,res);
  if(validator===false){
    commonService.error(res,"BAD_REQUEST",400);
    log.error("{'userId':"+req.headers['userid']+",'Message':'error logout validator'"+",'Url':"+req.originalUrl+"}");
  }else{
    log.debug("{'userId':"+req.headers['userid']+",'Message':'in logout'"+",'Url':"+req.originalUrl+"}");
    tokenservice.logout(req, res);
  }
});
module.exports = router;
