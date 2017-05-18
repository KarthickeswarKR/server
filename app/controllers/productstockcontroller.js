var express = require('express');
var router = express.Router();
var passport = require('passport');

var productstockservice = require('../services/productstockservice');
router.post('/addproductstock', passport.authenticate('bearer', {
    session: false
}),function(req, res, next) {
    productstockservice.addproductstock(req,res);
});

module.exports = router;
