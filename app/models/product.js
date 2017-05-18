var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = new Schema({
    _id:String,
    productId:String,
    productName:{
      type:String
    },
    brandId:{
      type:String,
      ref:'brand'
    },
    variantId:{
      type:String,
      ref:'variant'
    },
    productDescription:{
      type:String
    },
    unit:{
      type:String,
      ref:'unit'
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
  specifications:Schema.Types.Mixed
  }, {strict: false});
module.exports = mongoose.model('product', product);
