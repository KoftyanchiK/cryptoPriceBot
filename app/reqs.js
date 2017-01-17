var config = require("nconf");
var https = require("https");

config
	.argv()
	.env()
	.file({file: "./config.json"});

var f = {
	polo: function(callback) {
		var poloOpts = {
			encoding: 'utf8',
			method: "GET",
			hostname: config.get("poloniex").uri,
			path: config.get("poloniex").path,
			charset: 'utf8'
		}

		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				// data = JSON.parse(data);
				// console.log(data);
				// callback(data);
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				//console.log(data);
				callback(null, data.USDT_BTC);
			});
		};

		var req = https.request(poloOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},

	huobi: function huobi(callback) {
		var huobiOpts = {
			encoding: 'utf8',
			method: "GET",
			hostname: config.get("huobi").uri,
			path: config.get("huobi").path,
			charset: 'utf8'
		}
		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				// data = JSON.parse(data);
				// console.log(data);
				// callback(data);
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				//console.log(data);
				callback(null, data);
			});
		}
		var req = https.request(huobiOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	}
	
}




module.exports = f;
