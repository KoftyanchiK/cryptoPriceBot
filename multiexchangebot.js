//poloniex, huobi, btcc, huobi, bittrex, kraken - lastprice bot


var async = require("async");
var reqs = require("./app/reqs.js");

//get all request names
polo = reqs.polo;
huobi = reqs.huobi;
okcoin = reqs.okcoin;
btcc = reqs.btcc;
kraken = reqs.kraken;
bittrex = reqs.bittrex;
btce = reqs.btce;
//and pass them to async.series over object, that allows to see named response of request
var tasks = {polo: polo, huobi: huobi, okcoin: okcoin, btcc: btcc, kraken: kraken, bittrex: bittrex};

async.series(tasks, function (err, res) {
	if(err)
		console.log(err)
	else
		console.log(res);
});