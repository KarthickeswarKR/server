/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var resHandler = require("../common/res-handler");
var UserIdentificationKeys = require('../models/user-identification-keys');
var commonService = require("../common/commonService.js");
var admin = require('../models/admin');
var crypto = require('crypto');
var log = require('log4js').getLogger("user dao");
module.exports = {
  /**
   *
   * @param req
   * @param res
   * @description Service for deleteuser
   */
    deleteuser: function(req, res) {
      try{
        log.debug("{'userId':"+req.headers['userid']+",'Message':' in deleteuser'"+",'Url':"+req.originalUrl+"}");
        users.update({
            _id: req.headers['userid']
        }, {
            $set: {
                "status": "n"
            }
        }, {
            upsert: true
        }, function(err, user) {
            if (err) {
              log.error("{'userId':"+req.headers['userid']+",'Message':'error in deleteuser'"+",'Url':"+req.originalUrl+"}");
        commonService.error(res,"Something went Wrong Try again",500);
            } else
                userbasic.delete(req, res);
        });
      }
      catch(err){
        log.error("{'userId':"+req.headers['userid']+",'Message':'error in deleteuser'"+",'Url':"+req.originalUrl+"}");
        commonService.error(res,"Something went Wrong Try again",500);

      }
    },
   /**
    *
    * @param req
    * @param res
    * @description Service for update password id in user
    */
    updatePassword: function(req, res) {
      try{
        log.debug("{'userId':"+req.headers['userid']+",'Message':'in updatePassword'"+",'Url':"+req.originalUrl+"}");
        users.findOne({
            _id: req.headers['userid']
        }, function(err, data) {
            if (err) {
              log.error("{'userId':"+req.headers['userid']+",'Message':'error in updatePassword'"+",'Url':"+req.originalUrl+"}");
            commonService.error(res,"Something went Wrong Try again",500);
            } else {
                var oldpassword = req.body.oldPassword;
                var userpassword = req.body.newPassword;
                var salt = data.salt;
                var oldhash = data.hashedPassword;
                var userId = data._id;
                var hashedpassword = crypto.createHmac('sha1', salt).update(oldpassword).digest('hex');
                var salt1 = crypto.randomBytes(32).toString('hex');
                var newhashedpassword = crypto.createHmac('sha1', salt1).update(userpassword).digest('hex');
                if (oldhash == hashedpassword) {
                    users.update({
                        _id: userId
                    }, {
                        $set: {
                            hashedPassword: newhashedpassword
                        }
                    }, {
                        upsert: true
                    }, function(err, h) {
                        if (err){
                          log.error("{'userId':"+req.headers['userid']+",'Message':'error in updatePassword'"+",'Url':"+req.originalUrl+"}");
                          commonService.error(res,"Something went Wrong Try again",500);
                      }  else {
                            users.update({
                                _id: userId
                            }, {
                                $set: {
                                    salt: salt1
                                }
                            }, {
                                upsert: true
                            }, function(err, h) {
                                if (err){
                                  log.error("{'userId':"+req.headers['userid']+",'Message':'error in updatePassword'"+",'Url':"+req.originalUrl+"}");
                                  commonService.error(res,"Something went Wrong Try again",500);
                                }else {
                                    var componentName = 'Adduser';
                                    var url = req.originalUrl;
                                    var data = {
                                        "isadded": "true",
                                        "message": "User Password updated Successfully"
                                    }
                                    log.info("{'userId':"+req.headers['userid']+",'Message':'Password updated Successfully'"+",'Url':"+req.originalUrl+"}");
                                    resHandler.success(res,data);
                                }
                            })
                        }
                    });
                } else {
                  log.error("{'userId':"+req.headers['userid']+",'Message':'error in updatePassword'"+",'Url':"+req.originalUrl+"}");
                commonService.error(res,"Invalid Old Password",425);
                }
            }
        });
      }
      catch(err){
        log.error("{'userId':"+req.headers['userid']+",'Message':'error in updatePassword'"+",'Url':"+req.originalUrl+"}");
        commonService.error(res,"Something went Wrong Try again",500);

      }
    },
    getUserKeyByToken: function(tokenId) {
        var query = UserIdentificationKeys.findOne({
            token: tokenId
        });
        return query;
    }
};
