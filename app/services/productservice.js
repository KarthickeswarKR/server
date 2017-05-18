var express = require('express');
var product = require('../models/product.js');
var uuid= require("node-uuid");
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.autocomplete = function(req, res) {
product.find({productName:{ "$regex": req.query.productName, "$options": "i" }},function(err,data){
  if(err){
commonService.error(res,err.message,403);
  }
  else{
    resHandler.success(res,data);
  }
})
};
exports.getproductinfobyid = function(req, res) {
product.findOne({productId: req.query.productId},function(err,data){
  if(err){
    commonService.error(res,err.message,403);
  }
  else{
    resHandler.success(res,data);
  }
})
};
