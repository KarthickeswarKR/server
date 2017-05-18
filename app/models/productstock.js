var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productstock = new Schema({
    _id:String,
    productstockId:String,
productId:{
  type:String,
  ref:'product',
  'alias': 'details'
},
stockareaId:{
  type:String,
  ref:'stockarea'
},
stockDetails:{
inStock:{
  type:Number
},
incomingStock:{
  type:Number
},
outgoingStock:{
  type:Number
}
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
module.exports = mongoose.model('productstock', productstock);
