var express = require('express');
var router = express.Router();
var passport = require('passport');
var sellservice = require('../services/sellservice');
router.post('/addsell',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    sellservice.addsell(req,res);
});
router.get('/getsellbyproductsinstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    sellservice.getsellbyproductsinstockarea(req,res);
});
router.get('/getsellbyproductsinstockarea',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    sellservice.getsellbyproductsinstockarea(req,res);
});
router.get('/getsellinfo',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    sellservice.getsellinfo(req,res);
});

module.exports = router;
