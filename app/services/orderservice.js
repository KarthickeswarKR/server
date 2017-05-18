var express = require('express');
var order = require('../models/order.js');
var uuid= require("node-uuid");
var productstockservice=require('../services/productstockservice');
var stockarea=require('../services/stockareaservice');

var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.addorder = function(req, res) {
  var orderId = uuid.v1();;

       var stock = new order({
        _id : orderId,
        orderId:orderId,
        productId:req.body.productId,
    productstockId:req.body.productstockId,
    sellId:req.body.sellId,
    stockareaId:req.body.stockareaId,
    orderName:req.body.orderName,
    destinationStockareaId:req.body.destinationStockareaId,
    quantity:req.body.quantity,
    cost:req.body.cost
     });
      stock.save(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
     resHandler.add(res,add);
   }
});
};
exports.getordersofstockarea=function(req,res){
  var data={};
  order.find({
        stockareaId:req.query.stockareaId
      }).populate({
        path:'productId'
      }).exec(function(err,orders){
    if(err){
      console.log(err);
      commonService.error(res,"error",403);
    }
    else{
data.userId=req.query.userId;
data.stockareaId=req.query.stockareaId;
data.orders=orders;
resHandler.success(res,data);
  }
  })
};
exports.getordersbyproductinstockarea=function(req,res){
  var data={};
  order.find({
        stockareaId:req.query.stockareaId,

        productId:req.query.productId
      }).populate({
        path:'productId'
      }).exec(function(err,orders){
    if(err){
      console.log(err);
      commonService.error(res,"error",403);
    }
    else{
data.userId=req.query.userId;
data.stockareaId=req.query.stockareaId;
data.orders=orders;
resHandler.success(res,data);
  }
  })
};

exports.getorderdetails=function(req,res){
  var data={};
  console.log(req.query.orderId);
  order.findOne({
        orderId:req.query.orderId}).populate({
          path:'productId'
        }).exec(function(err,orders){
    if(err){
      console.log(err);
      commonService.error(res,"error",403);
    }
    else{
      console.log(orders);
data.stockareaId=orders.stockareaId;
data.orders=orders;
resHandler.success(res,data);
  }
  })
};
exports.getdestinationsforproduct=function(req,res){
      var stockareas=[];
order.find({productId:req.query.productId},function(err,ordr){
  if(err){
    commonService.error(res,"error",403);
    console.log(err);
  }
  else{
    for(i=0;i<ordr.length;i++){
      stockareas.push(ordr[i].stockareaId);
    }
    console.log("stockareas"+stockareas);
    stockarea.viewdetails(req,res,stockareas).then(function(data){
      resHandler.success(res,data)
    },function(err){
      commonService.error(res,"error",403);

    })
  }
  })
};
