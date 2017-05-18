var mongoose = require('mongoose');
var app = process.cwd() + '/app/';
var log = require('log4js').getLogger("mongoose");
var config = require(app + 'config/config');
var connect=process.env.MONGO_URL ||config.get('mongoose:uri');
var options = {
	replset: {
		socketOptions : {
			keepAlive: 120 }
		},
  server: { poolSize: 5,
						reconnectTries: 10,
						socketOptions : {
							keepAlive: 120 }
						}
};
mongoose.connect(connect,options);
var db = mongoose.connection;
db.on('error', function (err) {
	log.error('Connection error:', err.message);
});
db.once('open', function callback () {
	log.info("Connected to DB!");
});

module.exports = mongoose;
