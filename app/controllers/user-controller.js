/**
 * Created by Karthick Eswar K R on 16/05/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userservice = require('../services/userservice');
router.post('/adduser', function(req, res, next){
userservice.addservice(req,res);
});
router.post('/update',passport.authenticate('bearer', {
    session: false
}),function(req, res, next){
userservice.update(req,res);
});
router.get('/getuser',passport.authenticate('bearer', {
    session: false
}),function(req, res, next){
userservice.getuser(req,res);
});

module.exports = router;
