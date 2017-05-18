/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Users = new Schema({
    _id: String,
    userId: {
        type: String
    },
  access_token:{
    type:String
  },
    userName: {
        type: String
          },
          fullName: {
              type: String
                },
    hashedPassword: {
        type: String,
        requires: true
    },
    salt: {
        type: String
    },
    email:{
      type:String
    },
phone:{
  type:Number
},
address:{
  type:String
},
city:{
  type:String
},
state:{
  type:String
},
pincode:{
  type:Number
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
        "default": "pending",
    }
});

Users.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

/*Users.virtual('userId').get(function () {
    return this.id;
});*/

Users.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        //more secure - this.salt = crypto.randomBytes(128).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    });


Users.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
module.exports = mongoose.model('Users', Users);
