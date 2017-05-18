/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var oauth2 = require('../auth/oauth2');
var	router = express.Router();

router.post('/token', oauth2.token);

module.exports = router;
