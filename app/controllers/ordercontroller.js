var express = require('express');
var router = express.Router();
var passport = require('passport');

var orderservice = require('../services/orderservice');
router.post('/addorder',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.addorder(req,res);
});
router.get('/getordersofstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.getordersofstockarea(req,res);
});
router.get('/getorderdetails',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.getorderdetails(req,res);
});
router.get('/getordersbyproductinstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.getordersbyproductinstockarea(req,res);
});
router.get('/getordersbyproductinstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.getordersbyproductinstockarea(req,res);
});
router.get('/getdestinationsforproduct',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    orderservice.getdestinationsforproduct(req,res);
});

module.exports = router;
