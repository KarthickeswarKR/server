var express = require('express');
var router = express.Router();
var passport = require('passport');
var unit=require('../models/unit');
router.get('/units', function(req, res, next) {
unit.find({},function(err,data){
  if(err){
    res.send(err);
  }
  else{
    res.send(data);
  }
});
});
module.exports = router;
