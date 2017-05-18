var express = require('express');
var users = require('../models/users.js');
var uuid= require("node-uuid");
var userservice=require('../services/userservice');
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.addservice = function(req, res) {
  var userId = uuid.v1();
  var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
  console.log("ïn service");
  if(req.body.userName.match(/^\d+$/)) {
 console.log("inmail");
   var user = new users({
    _id : userId,
    userId:userId,
    phone:req.body.userName,
    userName:req.body.userName,
    password:req.body.password
 });
     }else{
       var user = new users({
        _id : userId,
        userId:userId,
        email:req.body.userName,
          userName:req.body.userName,
        password:req.body.password
     });
     }
      user.save(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
     resHandler.add(res,add);
   }
});
};
exports.update = function(req, res) {
users.update({userId:req.body.userId},{$set:{fullName:req.body.name,landmark:req.body.landmark,pincode:req.body.pincode,state:req.body.state,city:req.body.city,phone:req.body.phone,email:req.body.email,address:req.body.address}},{upsert:true},function(err,data){
  if(err){
    commonService.error(res,"error",403);
  }
  else{
    resHandler.update(res,data);
  }
})
};

exports.getuser = function(req, res) {
users.findOne({userId:req.query.userId},function(err,data){
  if(err){
    commonService.error(res,"error",403);
  }
  else{
    resHandler.success(res,data);
  }
})
}
