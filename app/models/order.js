var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = new Schema({
    _id:String,
    userId:{
      type:String,
      ref:'Users'
    },
  orderId:
  {
    type:String
  },
  productstockId:{
    type:String,
    ref:'productstock'
  },
  productId:{
    type:String,
    ref:'product',
    'alias': 'productDetails'
  },
  stockareaId:{
    type:String,
    ref:'stockarea'
  },
  sellId:{
    type:String,
    ref:'sell'
  },
  destinationStockareaId:{
    type:String,
    ref:'stockarea'
  },
  cost:{
    type:Number
  },
  quantity:{
    type:Number
  },
  date:{
    type:String
  },
  unit:{
    type:String
  },
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
  }
});
module.exports = mongoose.model('order', order);
