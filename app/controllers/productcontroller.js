var express = require('express');
var router = express.Router();
var passport = require('passport');

var productservice = require('../services/productservice');
router.post('/addproduct',passport.authenticate('bearer', {
    session: false
}), function(req, res, next) {
    productservice.addproduct(req,res);
});
router.get('/autocomplete',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  productservice.autocomplete(req,res);
});
router.get('/getproductinfobyid',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  productservice.getproductinfobyid(req,res);
});

module.exports = router;
