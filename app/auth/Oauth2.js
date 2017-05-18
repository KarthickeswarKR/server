/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var auditLog = require('audit-log');
var app = process.cwd() + '/app/';
var usersservice=require(app+'services/userservice');
var config = require(app + 'config/config');
var log = require('log4js').getLogger("Oath2");
var users = require(app + 'models/users');
var AccessToken = require(app + 'models/accessToken');
var RefreshToken = require(app + 'models/refreshToken');

// create OAuth 2.0 server
var aserver = oauth2orize.createServer();

// Generic error handler
var errFn = function (cb, err) {
	if (err) {
		return cb(err);
	}
};

// Destroys any old tokens and generates a new access and refresh token
var generateTokens = function (data, done) {
	// curries in `done` callback so we don't need to pass it
    var errorHandler = errFn.bind(undefined, done),
	    refreshToken,
	    refreshTokenValue,
	    token,
	    tokenValue;

  //  RefreshToken.remove(data, errorHandler);
  //  AccessToken.remove(data, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save(function (err) {
    	if (err) {

			log.error(err);
    		return done(err);
    	}
			var tokenLife=process.env.TOKENLIFE || config.get('security:tokenLife');
			users.findOne({_id:data.userId},function(err,user){
							if(err){
							log.error(err);
				    		return done(err);
							}
							else if(user.type==='phone'){
								if(user.status===210){
							var otp=usersservice.otp(data.userId,user.userName);
							users.update({_id:data.userId},{$set:{status:211}},{upsert:true},function(err,userdata){
								if(err){
									log.error(err);
						    		return done(err);
								}
								else{
							return	done(null, tokenValue, refreshTokenValue,{
									'expires_in': tokenLife,
								'userId' : data.userId,
								'code':user.status,
								'type':user.type,
								'userStatusCode':user.status
								});
							}
						});
							}else{
								done(null, tokenValue, refreshTokenValue,{
										'expires_in': tokenLife,
									'userId' : data.userId,
									'code':user.status,
									'type':user.type,
									'userStatusCode':user.status
									});
							}
							}
							else{
								done(null, tokenValue, refreshTokenValue, {
									'expires_in': tokenLife,
								'userId' : data.userId,
								'type':user.type,
									'userStatusCode':data.status
								});
							}
			});

    });
};

// Exchange username & password for access token.
aserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
	users.findOne({ userName: username }, function(err, user) {

		if (err) {
			return done(err);

		}
		if (!user || !user.checkPassword(password)) {
			return done(null, false);
		}

		auditLog.logEvent(user._id, 'App Server', 'Login', 'users LoggedIn Successfully', '', 'users LoggedIn Successfully');

		var model = {
			userId: user._id,
			clientId: client.clientId
		};
		generateTokens(model, done);
	});

}));

// Exchange refreshToken for access token.
aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
	RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
		if (err) {
			return done(err);
		}

		if (!token) {
			return done(null, false);
		}
		users.findById(token.userId, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }

			var model = {
				userId: user._id,
				clientId: client.clientId
			};
			generateTokens(model, done);
		});
	});
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
	passport.authenticate(['oauth2-client-password'], { session: false }),
	aserver.token(),
  aserver.errorHandler()
];
