/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var async = require("async");
var log = require('log4js').getLogger("commonservice");

module.exports = {
  error: function(res,data,code) {
    log.debug("in commonservice")
      res.send({
          "status":"error",
          "message": data || {},
          "code":code
        });
    },
    getEmpty:function(req,res,componentName,url,data) {
      try{
        log.debug("in commonService get empty");
      var requserids=[];
      userBasic.findOne({
          userId: req.headers['userid']
      }, function(err, userbasicdata) {
          if (err) {
            log.error("error in commonService get empty");

              this.error(res, "unauthorized",401);
          } else {
              var requser = userbasicdata.connections.connections;
              var reqproduct = userbasicdata.products.products;
              async.each(requser,function(userids,callback){
              userBasic.findOne({_id:userids},function(err,users){
                requserids.push(users.userId);
                callback();
              })
            },function(err){
              log.debug("response send successfully");
              var convertedJSON = JSON.parse(JSON.stringify(data));
              convertedJSON.connectedUserIds = requserids;
              requserids.push(req.headers['userid']);
              convertedJSON.followingProductIds = reqproduct;
              return res.json({
                status: 'success',
                componentName:componentName,
           serviceRequested:url,
           isService:"success",
                data: data || {}
          })
        })

      };
    })
  }
  catch(err){
    log.debug("response send successfully");

res.error({"status":"error","data":"something went wrong please try again"});
  }
}
};
