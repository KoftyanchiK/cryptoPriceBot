var msg = {
	//takes result of async.series and make a message for telegram bot
	//* - symbol for telegram markdown formatting
	makeTgMessage: function(res) {
		var delimiter = "_========================_\r\n";
		var poloMsgPart = "Poloniex last prices:\r\n";
		for (var currency in res.polo) {
			if(currency.substring(0, 3) === "usd") {
				poloMsgPart += "*" + currency.toUpperCase() + '*: ' + res.polo[currency].last + ' *$*\r\n';
			} else if(currency.substring(0, 3) === "btc") {
				poloMsgPart += "*" + currency.toUpperCase() + '*: ' + res.polo[currency].last + ' *B*\r\n';
			}
			
		}
			//console.log(poloMsgPart);

		var huobiMsgPart = "Huobi last price:\r\n" +
							"*BTC_CNY*: " + res.huobi.ticker.last + " *¥*\r\n";

		var btccMsgPart = "BTCC last price:\r\n" +
							"*BTC_CNY*: " + res.btcc.ticker.Last + " *¥*\r\n";


		var okcoinMsgPart = "OKCoin last price:\r\n" +
							"*BTC_USD*: " + res.okcoin.ticker.last + " *$*\r\n";

		var krakenMsgPart = "Kraken last prices:\r\n";
		for (var currency in res.kraken) {
			if(currency.slice(-3) === "eur") {
				krakenMsgPart += "*" + currency.toUpperCase() + '*: ' + res.kraken[currency].c[0] + ' *€*\r\n';
			} else if(currency.slice(-3) === "usd") {
				krakenMsgPart += "*" + currency.toUpperCase() + '*: ' + res.kraken[currency].c[0] + ' *$*\r\n';
			}
			
		}

		var bittrexMsgPart = "Bittrex last price:\r\n" +
							"*BTC_USD*: " + res.bittrex.Last + " *$*\r\n";

		var message = 	delimiter + 
						poloMsgPart + delimiter +
						bittrexMsgPart + delimiter+
						krakenMsgPart + delimiter +
						okcoinMsgPart + delimiter +
						btccMsgPart + delimiter +
						huobiMsgPart + delimiter 
		; 
		return message;
	},

	makeComparasionMsg: function(res) {
		var btc_usd_msgPart =
		 	"*Poloniex*: " + res.polo.usdt_btc.last + "*$*\r\n" +
			"*Bittrex*: " + res.bittrex.Last + "*$*\r\n" +
			"*Kraken*: " + res.kraken.btc_usd.c[0] + "*$*\r\n" +
			"*OKCoin*: " + res.okcoin.ticker.last + "*$*\r\n"
		;

		var btc_cny_msgPart = 
			"*BTCC*: " + res.btcc.ticker.Last + " *¥*\r\n" +
			"*Huobi*: " + res.huobi.ticker.last + " *¥*\r\n"
		;

		var delimiter = "_========================_\r\n";
		var message =
		 	delimiter + "BTC in USD:\r\n" +
		 	btc_usd_msgPart + delimiter +
		 	"BTC in CNY:\r\n" +
		 	btc_cny_msgPart + delimiter
		;
		return message;
	}
}

module.exports = msg;