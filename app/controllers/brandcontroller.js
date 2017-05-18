var express = require('express');
var router = express.Router();
var passport = require('passport');

var brandservice = require('../services/brandservice');
router.post('/addbrand',passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    brandservice.addbrand(req,res);
});
module.exports = router;
