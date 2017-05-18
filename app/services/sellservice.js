var express = require('express');
var sell = require('../models/sell.js');
var uuid= require("node-uuid");
var productstockservice=require('../services/productstockservice');
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.addsell = function(req, res) {
  var sellId = uuid.v1();;
       var stock = new sell({
        _id : sellId,
        sellId:sellId,
        productId:req.body.productId,
    productstockId:req.body.productstockId,
    stockareaId:req.body.stockareaId,
    package:req.body.package,
    minimumQuantity:req.body.minimumQuantity,
    quantityAvailable:req.body.quantityAvailable,
    cost:req.body.cost
     });
      stock.save(function(err,add){
        if(err){
commonService.error(res,err.message,403);
        }
          else{
     resHandler.add(res,add);
   }
});
};
exports.getsellbyproductsinstockarea = function(req, res) {

      sell.find({stockareaId:req.query.stockareaId,productId:req.query.productId},function(err,add){
        if(err){
commonService.error(res,err.message,403);
        }
          else{
            resHandler.success(res,add);
   }
});
};
exports.getsellinfo = function(req, res) {

      sell.findOne({sellId:req.query.sellId},function(err,add){
        if(err){
          commonService.error(res,err.message,403);
        }
          else{
            resHandler.success(res,add);
   }
});
};
