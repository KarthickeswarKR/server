var express = require('express');
var router = express.Router();
var passport = require('passport');

var stockareaservice = require('../services/stockareaservice');
router.post('/addstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    stockareaservice.addstockarea(req,res);
});
router.post('/delete',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.delete(req,res);
})
router.post('/product/delete',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.deleteproduct(req,res);
})
router.post('/rename',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.rename(req,res);
})
router.post('/updateproducts',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.updateproducts(req,res);
})
router.get('/getproductinfoforstockarea',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.getproductinfoforstockarea(req,res);
})
router.get('/getstockareas',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.getstockareas(req,res);
})
router.get('/getproductsofstockarea',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.getproductsofstockarea(req,res);
})
router.get('/getstockarea',passport.authenticate('bearer', {
    session: false
}),function(req,res){
  stockareaservice.getstockarea(req,res);
})


module.exports = router;
