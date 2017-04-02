// uses express router
var express = require('express');
var friendListRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

friendListRouter.use(bodyParser.json());

//FRIENDS LIST
friendListRouter.route('/') 
.get(function (req, res, next) {
	/**TO-DO**/
	res.render('index', { title: 'Friends List' });
	console.log("friendlist")

})
.delete (function (req, res, next) {

	/**TO-DO**/
});

//CREATE TRANSACTION
friendListRouter.route('/:friendId/transactions/:transactionId')
.get(function (req, res, next) {
	/**TO-DO**/
	res.render('index', { title: 'Create Transaction' });
	console.log("create transaction")
})
.post(function (req, res, next) {
	/**TO-DO**/
});

module.exports = friendListRouter;