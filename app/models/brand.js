/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var brand = new Schema({
    _id: String,
    brandId:String,
    brandName:{
      type:String,
      unique:true
    },
    brandOwner:{
      type:String,
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
module.exports = mongoose.model('brand', brand);
