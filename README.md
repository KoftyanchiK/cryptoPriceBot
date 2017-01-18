# cryptoPriceBot

This is a telegram bot which can give you last prices from different exchanges like a poloniex, huobi, btcc, huobi, bittrex, kraken.
***
It's used nodejs with ***async***, ***nconf*** and ***node-telegram-node-api*** modules.
This bot was written for private using, but in some cases can be used by other people in chats.
***
Once in 2 hours it send's requests to all exchanges, generates message with last prices and send it to the group chat. ID of this chat can be set in ```config.json``` file which must be placed in a **root folder** of project.
### Sample ```config.json``` entry:
```
{
	"poloniex": {
		"uri" : "poloniex.com",
		"path": "/public?command=returnTicker"
	},

	"huobi": {
		"uri" : "api.huobi.com",
		"path" : "/staticmarket/ticker_btc_json.js"
	},

	"okcoin": {
		"uri" : "www.okcoin.com",
		"path" : "/api/v1/ticker.do?symbol=btc_usd"
	},

	"btcc": {
		"uri" : "pro-data.btcc.com",
		"path" : "/data/pro/ticker?symbol=XBTCNY"
	},

	"kraken": {
		"uri" : "api.kraken.com",
		"path" : "/0/public/Ticker?pair=XBTEUR,XBTUSD,ZECUSD"
	},

	"bittrex": {
		"uri" : "bittrex.com",
		"path" : "/api/v1.1/public/getticker?market=USDT-BTC"
	},

	"btce": {
		"uri" : "btc-e.com",
		"path" : "/api/3/ticker/btc_rur"
	},

	"telegram" : {
		"token" : **there shuold be a token of your telegram bot**,
		"groupChatId" : **there should be a group chat id**
	}
}
```