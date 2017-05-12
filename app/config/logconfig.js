var nconf = require('nconf');

nconf.argv()
	.env()
	.file({
		file: process.cwd() + '/log4js.json'
	});

module.exports = nconf;
