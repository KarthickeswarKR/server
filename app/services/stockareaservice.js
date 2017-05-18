var express = require('express');
var stockarea = require('../models/stockarea.js');
var uuid= require("node-uuid");
var stockareadao = require('../dao/stockareadao');

var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
exports.addstockarea = function(req, res) {
  var stockareaId = uuid.v1();;

       var stock = new stockarea({
        _id : stockareaId,
        userId:req.body.userId,
        stockareaId:stockareaId,
        stockareaName:req.body.stockareaName,
        latitude:req.body.latitude,
        longtitude:req.body.longtitude,
        address:req.body.address,
        phone:req.body.phone
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
exports.updateproducts = function(req, res) {
  var products=req.body.products;
      for(i=0;i<products.length;i++){
        var productid=products[i];
        stockareadao.updateproducts(productid,req.body.stockareaId).then(function(data){
console.log("successfullyupdated");
        },function(err){
          commonService.error(res,"error",403);

        })
        console.log("in product");

}
resHandler.update(res,"data updated successfully");

}
exports.delete = function(req, res) {
      stockarea.update({stockareaId:req.body.stockareaId},{$set:{status:"inactive"}},{upsert:true},function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            productstockservice.deletebystockarea(req.body.stockareaId).then(function(data){
                resHandler.delete(res,data);

            }, function (err) {
              commonService.error(res,"error",403);
  })
   }
});
}
exports.rename = function(req, res) {
      stockarea.update({stockareaId:req.body.stockareaId},{$set:{stockareaName:req.body.stockareaName}},{upsert:true},function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
                resHandler.update(res,add);

   }
});
}
exports.deleteproduct = function(req, res) {
      stockarea.update({stockareaId:req.body.stockareaId},{$pull:{products:req.body.productId}},{upsert:true},function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            productstockservice.deletebystockareaproduct(req.body.stockareaId,req.body.productId).then(function(data){
                resHandler.delete(res,add);
            }, function (err) {
              commonService.error(res,"error",403);
  })

   }
});
}
exports.getproductinfoforstockarea = function(req, res) {
      stockarea.findOne({stockareaId:req.query.stockareaId}).populate(
        { path: 'products',
        populate:{
         path: 'productId',
         match:{
           productId:req.query.productId
         },
       }
    }).exec(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            var products=add.products;
            for(i=0;i<products.length;i++){
              if(products[i].productId==null){
              products.pull(products[i]);
            }
          }
          console.log(products);
            resHandler.success(res,add);
   }
});
}
exports.getproductsofstockarea = function(req, res) {
      stockarea.findOne({stockareaId:req.query.stockareaId}).populate(
        { path: 'products',
        populate:{
         path: 'productId'
       }
    }).exec(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            resHandler.success(res,add);
   }
});
}
exports.getstockareas = function(req, res) {
      stockarea.find({userId:req.query.userId}).populate(
        { path: 'products',
        populate:{
         path: 'details'
       }
    }).exec(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            resHandler.success(res,add);
   }
});
}
exports.getstockarea = function(req, res) {
      stockarea.find({stockareaId:req.query.stockareaId}).exec(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
            resHandler.success(res,add);
   }
});
}
return exports.viewdetails = function(req, res,stocks) {
  var stockareas=[];
  for(i=0;i<stocks.length;i++){
    return  stockarea.find({stockareaId:stocks[i]}).exec(function(err,add){
        if(err){
commonService.error(res,"error",403);
        }
          else{
stockareas.push(add);
console.log(add);
   }
});
}
console.log(stockareas);
console.log("5542");
return stockareas;
}
