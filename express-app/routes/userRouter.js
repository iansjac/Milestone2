// uses express router
var express = require('express');
var userRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');

/** 1- declare mongoose **/
var mongoose = require('mongoose');
var users = require('../models/user');
userRouter.use(bodyParser.json());

//LOG IN
userRouter.route('/log-in') // a second router is define using parameters.
.get(function (req, res, next) {
	// create a sample user
	var troy = new users({
			username: 'troy01',
			password: 'password',
			phone_number: "7746331187",
			name: "Troy Ingel",
			email: "Troy@qu.com"
		});

	// save the sample user
	troy.save(function (err) {
		if (err)
			throw err;

		console.log('User saved successfully');
		res.json({
			success: true
		});
	});
})
.post(function (req, res, next) {
// find the user
users.findOne({
	username: req.body.username
}, function (err, user) {

	if (err)
		throw err;

	if (!user) {
		res.json({
			success: false,
			message: 'Authentication failed. User not found.'
		});
	} else if (user) {

		// check if password matches
		if (user.password != req.body.password) {
			res.json({
				success: false,
				message: 'Authentication failed. Wrong password.'
			});
		} else {

			// if user is found and password is right
			// create a token
			var token = jwt.sign(user, config.secret, {
					expiresIn: 60 // expires in 24 hours
				});

			// return the information including token as JSON
			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		}

	}

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
