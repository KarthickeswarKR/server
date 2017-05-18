/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var stockarea = new Schema({
    _id: String,
    stockareaId:{
      type:String
        },
    userId:{
      type:String,
      ref:'Users'
    },
    stockareaName:{
      type:String
    },
  latitude:{
    type:Number
  },
  longitude:{
    type:Number
  },
  products:[{
  type:String,
  ref:'productstock'
  }],
createdOn: {
    type: Date,
    "default": Date.now
},
updatedOn: {
    type: Date,
    "default": Date.now
},
status: {
    type: String,
    "default": "active"
},
});

module.exports = mongoose.model('stockarea', stockarea);
