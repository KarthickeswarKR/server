/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express'),
    router = express.Router()
var passport = require('passport');
var mongoose = require('mongoose');
var BasicStrategy = require('passport-http').BasicStrategy;
var FacebookStrategy = require('passport-facebook').Strategy
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var app = process.cwd() + '/app/';
var config = require(app + 'config/config');
var log = require(app + 'config/log')(module);
var users = require(app + 'models/users');
var Client = require(app + 'models/client');
var AccessToken = require(app + 'models/accessToken');
var RefreshToken = require(app + 'models/refreshToken');
var tokenservie=require("../services/tokenservice");
/*passport.use(new BasicStrategy(
    function(username, password, done) {
        Client.findOne({ clientId: username }, function(err, client) {
            if (err) {
            	return done(err);
            }

            if (!client) {
            	return done(null, false);
            }

            if (client.clientSecret !== password) {
            	return done(null, false);
            }

            return done(null, client);
        });
    }
));*/


passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({ clientId: clientId }, function(err, client) {
            if (err) {
            	return done(err);
            }

            if (!client) {
            	return done(null, false);
            }

            if (client.clientSecret !== clientSecret) {
            	return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, done) {
        AccessToken.findOne({ token: accessToken }, function(err, token) {

            if (err) {
            	return done(err);
            }

            if (!token) {
            	return done(null, false);
            }
var tokenLife= process.env.TOKENLIFE || config.get('security:tokenLife')
            if( Math.round((Date.now()-token.created)/1000) >tokenLife) {

                AccessToken.remove({ token: accessToken }, function (err) {
                    if (err) {
                    	return done(err);
                    }
                });

                return done(null, false, { message: 'Token expired' });
            }

            users.findById(token.userId, function(err, user) {

                if (err) {
                	return done(err);
                }

                if (!user) {
                	return done(null, false, { message: 'Unknown user' });
                }

                var info = { scope: '*' };
                done(null, user, info);
            });
        });
    }
));
module.exports = router
