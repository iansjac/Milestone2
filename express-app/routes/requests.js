// uses express router
var express = require('express');
var requestsRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

requestsRouter.use(bodyParser.json());

//REQUESTS
requestsRouter.route('/')
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("requests")
	res.render('index', { title: 'Requests' });
})
.put(function (req, res, next) {
	/**TO-DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
});

module.exports = requestsRouter;