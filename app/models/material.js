/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var material = new Schema({
    _id: String,
    materialId:String,
    materialName:{
      type:String
    },
    CasNo:{
      type:String
    },
     otherName:[{
type:String,
index:true,
text:true
    }],
packages:[{
  packageName:{
    type:String
  },
  packageSize:{
    type:Number}
    ,
  packageUnit:
  {
    type:String
  }
}]
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
/*grades:[
  {
    id:String,
    name:{
      type:String
    }
  }
],
type:[
  {id:String,
    name:{
      type:String
    }
  }
]
*/
module.exports = mongoose.model('material', material);
