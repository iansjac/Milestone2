var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var friends = require('../models/user');
var requests = require('../models/friend-request');
var users = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect("/home")
});

//HOME - done
router.route('/home')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		/**TO-DO**/
		res.render('index', {
			title: 'Welcome Home ' + req.user.username + "!"
		});
	} else {
		res.render('index', {
			title: 'Please sign in !'
		});
	}
	/**TO-DO**/

});

//PROFILE - didnt look at
router.route('/profile')
.get(function (req, res, next) {
	users.find({}, function (err, user) {
		if (err)
			throw err;
		res.json(user);
	});
	console.log("profile")
	res.render('index', {
		title: 'Profile'
	});
})
.put(function (req, res, next) {
	users.findByIdAndUpdate(req.params.userId, {
		$set: req.body
	}, {
		new: true
	}, function (err, user) {
		if (err)
			throw err;
		res.json(user);

	});

});

//FRIENDS LIST - didnt look at
router.route('friendslist/:friends')
.get(function (req, res, next) {
	friends.find({}, function (err, f) {
		if (err)
			throw err;
		res.json(f);
	});
	res.render('index', {
		title: 'Friends List'
	});
	console.log("friendlist")

});

router.route('friendslist/:friends/friendId')

.delete (function (req, res, next) {
	friends.findByIdAndRemove(req.params.friendId, function (err, resp) {
		if (err)
			throw err;
		res.json(resp);
	});
});

//CREATE TRANSACTION - didnt look at
router.route('friendslist/:friendId/transactions/:transactionId')
.get(function (req, res, next) {
	friends.findById(req.params.friendId, function (err, tran) {
		if (err)
			throw err;
		res.json(tran.transactions.id(req.params.transactionId));
	});
})
.post(function (req, res, next) {
	recipes.findById(req.params.friendId, function (err, recipe) {
		if (err)
			throw err;
		recipe.comments.push(req.body); //push to the comments collection
		recipe.save(function (err, recipe) {
			if (err)
				throw err;
			console.log('Updated Comments!');
			res.json(recipe);
		});
	});
});

//REQUESTS - didnt look at
router.route('/requests')
.get(function (req, res, next) {
	requests.find({}, function (err, freq) {
		if (err)
			throw err;
		res.json(freq);
	});
	console.log("requests")
	res.render('index', {
		title: 'Requests'
	});
})
.put(function (req, res, next) {
	requests.findByIdAndUpdate(req.params.requestId, {
		$set: req.body //assuming body contains the update
	}, {
		new: true
	}, function (err, freq) {
		if (err)
			throw err; //propagate error
		res.json(freq);

	});
})
.post(function (req, res, next) {
	requests.create(req.body, function (err, freq) {
		if (err)
			throw err; //propagate error

		console.log('Created new Frined Request');

		var id = freq._id
			res.writeHead(200, {
				'Content-Type': 'text-plain'
			});
		res.end('Added:' + id);
	});
});

//Check if registered user logged in
function isLoggedIn(req, res) {
	if (req.isAuthenticated())
		return true;
	else
		false
};
module.exports = router;
