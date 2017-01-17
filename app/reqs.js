var config = require("nconf");
var https = require("https");

config
	.argv()
	.env()
	.file({file: "./config.json"});

function getOpts(exchange) {
	return {
		encoding: 'utf8',
		method: "GET",
		hostname: config.get(exchange).uri,
		path: config.get(exchange).path,
		charset: 'utf8'
	};
}

var f = {
	polo: function(callback) {
		var poloOpts = getOpts("poloniex");

		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
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
		var huobiOpts = getOpts("huobi");

		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				callback(null, data);
			});
		}

		var req = https.request(huobiOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},
	
	okcoin: function okcoin(callback){
		var okcoinOpts = getOpts("okcoin");
		
		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				callback(null, data);
			});
		}
		var req = https.request(okcoinOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},

	btcc: function btcc(callback){
		var btccOpts = getOpts("btcc");
		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				callback(null, data);
			});
		}
		var req = https.request(btccOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},

	bittrex: function bittrex(callback){
		var bittrexOpts = getOpts("bittrex");
		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				callback(null, data);
			});
		}
		var req = https.request(bittrexOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},

	kraken: function kraken(callback){
		var krakenOpts = getOpts("kraken");
		function sendReq(res) {
			let body = '';
			res.on('data', function (data) {
				body += data;
			});
			res.on('end', () => {
				let data = JSON.parse(body);
				callback(null, data);
			});
		}
		var req = https.request(krakenOpts, sendReq);

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},
//BTCE exchange has been blocked in Russia and ticker can't be retrieved from server
	// btce: function btce(callback){
	// 	var btceOpts = getOpts("btce");
	// 	function sendReq(res) {
	// 		let body = '';
	// 		res.on('data', function (data) {
	// 			body += data;
	// 		});
	// 		res.on('end', () => {
	// 			let data = JSON.parse(body);
	// 			callback(null, data);
	// 		});
	// 	}
	// 	var req = https.request(btceOpts, sendReq);

	// 	req.on('error', function(e) {
	// 		console.log("btce problem!");
	// 		console.log('problem with request: ' + e.message);
	// 	});

	// 	req.end();
	// }
}




module.exports = f;
