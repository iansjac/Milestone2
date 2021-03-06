// uses express router
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var userRouter = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var requests = require('../models/friend-request');

userRouter.use(bodyParser.json());

userRouter.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
//REGISTER
userRouter.get('/register', function (req, res) {
	res.render('index', {
		title: "Please post to register"
	});
});
//REGISTER - CREATE ACCOUNT
userRouter.post('/register', function (req, res) {
	User.register(new User({
			username: req.body.username,
			phone_number: req.body.phone_number,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}),
		req.body.password, function (err, account) {
		if (err) {
			return res.status(500).json({
				err: err
			});
		}
		passport.authenticate('local')(req, res, function () {
			return res.status(200).json({
				status: 'Registration successful!'
			});
		});
	});
});
//LOGIN
userRouter.get('/login', function (req, res) {
	
});
//LOGIN AUTHENTICATION
userRouter.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({
				err: info
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
			res.status(200).redirect("/home");
		});
	})(req, res, next);
});
//LOGOUT 
userRouter.get('/logout', function (req, res) {
	if (isLoggedIn(req, res)) {
		req.logout();
		res.status(200).json({
			status: 'Bye!'
		});

	} else
		res.status(200).json({
			status: 'Not Logged In!'
		});

});

//SEARCH FOR A USER
userRouter.route('/search').post(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		var name = req.body.username;
		User.find({
			username: name
		}, function (err, freq) {
			if (err)
				throw err;
			res.json(freq);
		});
		console.log("search");
	} else {
		res.redirect("/home");
	}
});
//SEARCH AND SEND FRIEND REQUEST
userRouter.route('/search/:username').post(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		User.findOne({
			username: req.params.username
		}, function (err, foundUser) {
			if (err)
				throw err;
			console.log("Found " + foundUser.username);

			requests.create({
				status: "PENDING",
				sender: req.user.username,
				receiver: foundUser.username
			}, function (err, newRequest) {
				if (err)
					throw err; //propagate error

				console.log('Created new Frined Request');
				var id = newRequest._id;

				req.user.friend_request.push(id); //push to the comments collection
				req.user.save(function (err, updatedUser) {
					if (err)
						throw err;

				});
				foundUser.friend_request.push(id); //push to the comments collection
				foundUser.save(function (err, updatedUser) {
					if (err)
						throw err;

					res.json("Request Sent !");

				});

			});

		});
	} else {
		res.redirect("/home");
	}

});

//Check if a registered user is logged in
function isLoggedIn(req, res) {
	if (req.isAuthenticated())
		return true;
	else
		false
};
module.exports = userRouter;
