var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var friends = require('../models/user');
var requests = require('../models/friend-request');
var users = require('../models/user');
var transactions = require('../models/transaction');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect("/home")
});

//HOME
router.route('/home')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		res.render('index', {
			title: 'Welcome Home ' + req.user.username + "!"
		});
	} else {
		
	}

});

//PROFILE - show details
router.route('/profile')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {

		res.json(req.user);

	} else {
		res.redirect("/home")
	}

});
//UPDATE PROFILE
router.route('/profile').put(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		users.findByIdAndUpdate(req.user._id, {
			$set: req.body
		}, {
			new: true
		}, function (err, freq) {
			if (err)
				throw err;
			res.json(freq);
		})
	} else {
		res.redirect("/home")
	}
});

//FRIENDS LIST - show friends
router.route('/friendslist')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {

		res.json(req.user.friends_list);

	} else {
		res.redirect("/home")
	}
});
//DELETE FRIEND
router.route('/friendslist/:friend')
.delete (function (req, res, next) {
	if (isLoggedIn(req, res)) {
		req.user.friends_list.remove(req.params.friend);
		req.user.save(function (err, updatedUser) {
			if (err)
				throw err;
			users.findOne({
				username: req.params.friend
			}, function (err, foundUser) {
				if (err)
					throw err;
				foundUser.friends_list.remove(req.user.username);
				foundUser.save(function (err, updatedUser) {
					if (err)
						throw err;

					res.render('index', {
						title: 'Friend Removed !'
					});
				});
			});

		});
	} else {
		res.redirect("/home")
	}
});

//GET SPECIFIC TRANSACTION
router.route('/friendslist/:friendId/transactions/:transactionId')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		transactions.findById(req.params.transactionId, function (err, tran) {
			if (err)
				throw err;
			if ((tran.sender == req.params.friendId || tran.receiver == req.params.friendId) && tran.status == "ACCEPTED") {
				res.json(tran);
			} else {
				res.render('index', {
					title: 'No transactions with that friend or it was not accepted yet !'
				});
			}
		});
	} else {
		res.redirect("/home")
	}
});
//ACCEPT TRANSACTION
router.route('/friendslist/:friendId/transactions/:transactionId')
.put(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		transactions.findByIdAndUpdate(req.params.transactionId, {
			$set: req.body //assuming body contains the update
		}, {
			new: true
		}, function (err, tran) {
			if (err)
				throw err; //propagate error
			res.render('index', {
				title: 'Transaction Updated !!! !'
			});
		});
	} else {
		res.redirect(303,"/home")
	}
});
//CREATE TRANSACTION REQUEST
router.route('/friendslist/:friendId/transactions').post(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		users.findOne({
			username: req.params.friendId
		}, function (err, foundUser) {
			if (err)
				throw err;
			console.log("Found " + foundUser.username);

			transactions.create({
				status: "PENDING",
				sender: req.user.username,
				receiver: foundUser.username,
				receiver_type: req.body.receiver_type,
				sender_type: req.body.sender_type,
				amount: req.body.amount
			}, function (err, newRequest) {
				if (err)
					throw err; //propagate error

				console.log('Created new Transaction Request');
				var id = newRequest._id;

				req.user.transactions.push(id); //push to the comments collection
				req.user.save(function (err, updatedUser) {
					if (err)
						throw err;

				});
				foundUser.transactions.push(id); //push to the comments collection
				foundUser.save(function (err, updatedUser) {
					if (err)
						throw err;

					res.json("Transaction Request Sent !");

				});

			});

		});
	} else {
		res.redirect("/home");
	}
});

//SHOW FRIEND REQUESTS
router.route('/friendrequests')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		requests.find({
			receiver: req.user.username
		}, function (err, freq) {
			if (err)
				throw err;
			res.json(freq);
		});
	} else {
		res.redirect("/home")
	}

});
//SHOW TRANSACTION REQUESTS 
router.route('/transactionrequests')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		transactions.find({
			receiver: req.user.username
		}, function (err, freq) {
			if (err)
				throw err;
			res.json(freq);
		});
	} else {
		res.redirect("/home")
	}

});
//ACCEPT FRIEND REQUEST
router.route('/friendrequests/:requestId').put(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		requests.findByIdAndUpdate(req.params.requestId, {
			$set: req.body //assuming body contains the update
		}, {
			new: true
		}, function (err, freq) {
			if (err)
				throw err; //propagate error
			if (freq.status == "ACCEPTED" && freq.receiver == req.user.username) {
				req.user.friends_list.push(freq.sender); 
				req.user.friend_request.remove(req.params.requestId);
				req.user.save(function (err, updatedUser) {
					if (err)
						throw err;

				});
				users.findOne({
					username: freq.sender
				}, function (err, foundUser) {
					if (err)
						throw err;

					foundUser.friends_list.push(freq.receiver); 
					foundUser.friend_request.remove(req.params.requestId);
					foundUser.save(function (err, updatedUser) {
						if (err)
							throw err;
						requests.findByIdAndRemove(freq._id, function (err, resp) {
							if (err)
								throw err;
							res.json(resp);
						});
					});
				});

			} else {
				res.render('index', {
					title: 'Status was not set to ACCEPTED or you are the sender and not the receiver of this request !'
				});
			}

		});
	} else {
		res.redirect(303,"/home")
	}

});

//Check if registered user logged in
function isLoggedIn(req, res) {
	if (req.isAuthenticated())
		return true;
	else
		false
};
module.exports = router;
