// uses express router
var express = require('express');
var userRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

/** 1- declare mongoose **/
var mongoose = require('mongoose');
var users = require('../models/user');
userRouter.use(bodyParser.json());

//LOG IN
userRouter.route('/log-in') // a second router is define using parameters.
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("log in")
	
	res.render('index', {
		title: 'Log In'
	});
})
.post(function (req, res, next) {
	/**TO-DO**/
	users.create(req.body, function (err, user) {
		if (err)
			throw err; //propagate error

		console.log('user created');

		var id = user._id
			res.writeHead(200, {
				'Content-Type': 'text-plain'
			}); //send reply back to the client with emoji id
		res.end('User added!' + '<br>Username: ' + user.username + '<br>Password: ' + user.password + '<br>Name: ' + user.name + '<br>Phone Number: ' + user.phone_number + '<br>Email: ' + user.email);

	});
});

//VIEW TRANSACTION
userRouter.route('/:userId/requests/:transactionId')
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("View transaction")
	res.render('index', {
		title: 'View Transaction'
	});
})
.put(function (req, res, next) {
	/**TO- DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
});

//SEARCH
userRouter.route('/:userId')
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("search")
	res.render('index', {
		title: 'Search'
	});
})

module.exports = userRouter;
