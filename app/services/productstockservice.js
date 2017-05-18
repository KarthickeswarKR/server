var express = require('express');
var productstock = require('../models/productstock.js');
var uuid= require("node-uuid");
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.addproductstock = function(productId,stockareaId) {
  console.log("productId"+productId);
  var productstockId = uuid.v1();;

       var stock = new productstock({
        _id : productstockId,
        productstockId:productstockId,
        stockareaId:stockareaId,
        productId:productId

     });

    return  stock.save(function(err,add){
        if(err){
console.log("error");        }
          else{
console.log(true);   }
});
};
exports.deletebystockarea=function(stockareaId){
return  productstock.update({stockareaId:stockareaId},{$set:{status:"inactive"}},{upsert:true},{multi: true},function(err,data){
    if(err){
    return err;
    }
    else{
      return data;
    }
  })
}
exports.deletebystockareaproduct=function(stockareaId,productId){
return  productstock.update({stockareaId:stockareaId,productId:productId},{$set:{status:"inactive"}},{upsert:true},{multi: true},function(err,data){
    if(err){
    return err;
    }
    else{
      return data;
    }
  })
}
