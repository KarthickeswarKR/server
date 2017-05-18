var express = require('express');
var router = express.Router();
var passport = require('passport');

var variantservice = require('../services/variantservice');
router.post('/addvariant',function(req, res, next) {
    variantservice.addvariant(req,res);
});
router.post('/editvariant',function(req, res, next) {
console.log("in filter");
  console.log(req.body);
    variantservice.edit(req,res);
});
router.post('/view',function(req, res, next) {
console.log("in filter");
  console.log(req.body);
    variantservice.view(req,res);
});
router.post('/viewbymaterial',function(req, res, next) {
console.log("in filter");
  console.log(req.body);
    variantservice.viewbymaterial(req,res);
});
router.post('/viewall',function(req, res, next) {
console.log("in filter");
  console.log(req.body);
    variantservice.viewall(req,res);
});
router.post('/delete',function(req, res, next) {
    variantservice.delete(req,res);
});
module.exports = router;
