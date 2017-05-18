/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var accessToken = require('../models/accessToken.js');
var commonService = require("../common/commonService.js");
var uuid = require("node-uuid");
var resHandler = require("../common/res-handler");
var log = require('log4js').getLogger("token service");
var users = require('../models/users');
  /**
   *
   * @param req
   * @param res
   * @description Service for tokenvalidator
   */
  exports.tokenvalidator=function(req,res){
    try{
      console.log(req.body);
      log.debug("{'userId':"+req.query.userId+",'Message':'in tokenvalidator'"+",'Url':"+req.originalUrl+"}");
           var accesstoken=req.body.token;
      accessToken.findOne({userId:req.query.userId,token:req.query.access_token},function(err,data){
        console.log(data);
        if(data===null ||data===""){
          log.error("{'userId':"+req.query.userId+",'Message':'error in tokenvalidator'"+",'Url':"+req.originalUrl+"}");
          commonService.error(res,"Unauthorized",401);
    }
    else{
      if(err){
        commonService.error(res,"error",403);
      }else{
users.findOne({_id:req.body.userId},function(err,data){
  if(err){
    commonService.error(res,"error",403);
  }
  else{
    res.send({
      "status":"success",
      "userId":"req.query.userId",
      "code":"200",
      "message":"Successfully Verified"
    })

  }
})
    }}
  });
}
catch(err){
  log.error("{'userId':"+req.body.userId+",'Message':'error in tokenvalidator'"+",'Url':"+req.originalUrl+"}");
  commonService.error(res,"Something went Wrong Try again",500);

}
  };
  /**
   *
   * @param req
   * @param res
   * @description Service for logout
   */
  exports.logout=function(req,res){
    try{
      console.log(req.body);
      log.debug("{'userId':"+req.body.userId+",'Message':'in logout'"+",'Url':"+req.originalUrl+"}");

           var token=req.body.token.slice(7);
           console.log(token);
      accessToken.findOneAndRemove({userId:req.body.userId,token:token},function(err,data){
        if(data===null ||data===""){
          console.log(data);
          log.error("{'userId':"+req.body.userId+",'Message':'error in tokenvalidator'"+",'Url':"+req.originalUrl+"}");
          commonService.error(res,"Unauthorized",401);
    }
    else{
        log.info("{'userId':"+req.body.userId+",'Message':'logout success'"+",'Url':"+req.originalUrl+"}");

      resHandler.success(res,"Successfully loged out");
    }
  });
}
catch(err){
  console.log(err);
  log.error("{'userId':"+req.body.userId+",'Message':'error in logout'"+",'Url':"+req.originalUrl+"}");
  commonService.error(res,"Something went Wrong Try again",500);

}
  };
