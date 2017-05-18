/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var resHandler = require("../common/res-handler");
var commonService = require("../common/commonService.js");
var productstockservice=require('../services/productstockservice');

var stockarea = require('../models/stockarea');
module.exports = {
    updateproducts: function(productId,stockareaId) {
return stockarea.update({stockareaId:stockareaId},{$push:{products:productId}},{upsert:true},function(err,add){
        console.log("inupdate");
        if(err){
console.log(err);        }
          else{
              productstockservice.addproductstock(productId,stockareaId).then(function(data){

                  console.log("success in ps");
return data;
              }, function (err) {
console.log(err);    })
    console.log("success");

          }

});
    }
};
