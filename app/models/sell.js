var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sell = new Schema({
    _id:String,
    sellId:String,
  productstockId:{
    type:String,
    ref:'productstock'
  },
  productId:{
    type:String,
    ref:'product'
  },

minimumQuantity:{
  type:String
},
cost:{
  type:Number
},
quantityAvailable:{
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
  },
  package:Schema.Types.Mixed
  }, {strict: false});
module.exports = mongoose.model('sell', sell);
