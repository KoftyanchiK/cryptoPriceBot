//poloniex, huobi, btcc, huobi, bittrex, kraken - lastprice bot

var TelegramBot = require("node-telegram-bot-api");
var async = require("async");
var reqs = require("./app/reqs.js");
var config = require("nconf");
var makeMsg = require("./app/msg.js");

config
	.argv()
	.env()
	.file({file: "./config.json"});

var token = config.get("telegram").token;
var groupChatId = config.get("telegram").groupChatId;

// var token = "304958183:AAGCaP0WZVYpg4dNqOdbG--uXRfTTPnbVKw";
// var groupChatId = "-1001072581162";

var bot = new TelegramBot(token, {polling: true});

//get all request names
polo = reqs.polo;
huobi = reqs.huobi;
okcoin = reqs.okcoin;
btcc = reqs.btcc;
kraken = reqs.kraken;
bittrex = reqs.bittrex;
btce = reqs.btce;
//and pass them to async.series over object, that allows to see named response of request
var tasks = {
	polo: polo,
	huobi: huobi,
	okcoin: okcoin,
	btcc: btcc,
	kraken: kraken,
	bittrex: bittrex
};

// bot.on('message', function (msg) {
// 	var chatId = msg.chat.id;
// 	console.log("MESSAGE!!!");
// 	// send a message to the chat acknowledging receipt of their message
// 	async.series(tasks, function (err, res) {
// 		if(err)
// 			console.log(err)
// 		else {
// 			//make a message for telegram
// 			//console.log(res.kraken);
// 			//var msg = makeMsg.makeTgMessage(res);
// 			var compMsg = makeMsg.makeComparasionMsg(res);
// 			// console.log(compMsg);
// 			// console.log(msg);
// 			bot.sendMessage(chatId, compMsg, {parse_mode: "Markdown"});
			
// 		}
// 	});
// });

bot.onText(/\/price/, function (msg, match) {
	var chatId = msg.chat.id;
	console.log("Sending price to " + chatId);
	async.series(tasks, function (err, res) {
		if(err)
			console.log(err)
		else {
			//make a message for telegram
			var compMsg = makeMsg.makeComparasionMsg(res);
			bot.sendMessage(chatId, compMsg, {parse_mode: "Markdown"});
			
		}
	});
	//bot.sendMessage(chatId, resp);
});

function start() {
	async.series(tasks, function (err, res) {
		if(err)
			console.log(err)
		else {
			console.log("Regular 2 hour request sended...")
			//make a message for telegram
			var msg = makeMsg.makeTgMessage(res);
			var compMsg = makeMsg.makeComparasionMsg(res);
			bot.sendMessage(groupChatId, msg, {parse_mode: "Markdown"});
		}
	});
}

var interval = 1000 * 60 * 60 * 2; //in miliseconds 1000 * 60 = 60 seconds = 1 minute
console.log("Application was started");
setInterval(
	start,
	interval
);
