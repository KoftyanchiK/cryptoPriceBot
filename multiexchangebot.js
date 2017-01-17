//poloniex, huobi, btcc, huobi, bittrex, kraken - lastprice bot


var async = require("async");
var reqs = require("./app/reqs.js");

polo = reqs.polo;
huobi = reqs.huobi;
// console.log(reqs);


var tasks = {polo: polo, huobi: huobi};

async.series(tasks, function (err, res) {
	if(err)
		console.log(err)
	else
		console.log(res);
});