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
		res.render('index', {
			title: 'Welcome Home ' + req.user.username + "!"
		});
	} else {
		res.render('index', {
			title: 'Please sign in !'
		});
	}

});


//PROFILE - done
router.route('/profile')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		requests.find({
			username: req.user.username,
            email: req.user.email,
            phone_number: req.user.phone_number,
            first_name: req.user.first_name,
            last_name: req.user.last_name
		}, function (err, freq) {
			if (err)
				throw err;
			res.json(freq);
		});
	} else {
		res.redirect("/home")
	}

});

router.route('/profile/:profileId').put(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		profile.findByIdAndUpdate(req.params.profileId, {
			$set: req.body 
		}, {
			new: true
		}, function (err, freq) {
			if (err)
				throw err; 
			} else {
				res.render('index', {
					title: 'Profile!'
				});
			} else {
		res.redirect("/home")
	   }
    )};
});

//FRIENDS LIST - done
router.route('/friendslist')
.get(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		
			res.json(req.user.friends_list);
		
	} else {
		res.redirect("/home")
	}
});

router.route('/friendslist/:friend')

.delete (function (req, res, next) {
	if (isLoggedIn(req, res)) {
		friends.findByIdAndRemove(req.params.friend, function (err, resp) {
			if (err)
				throw err;
			res.json(resp);
		});
	} else {
		res.redirect("/home")
	}
});

//CREATE TRANSACTION - TODO
router.route('friendslist/:friendId/transactions/:transactionId')
.get(function (req, res, next) {
	friends.findById(req.params.friendId, function (err, tran) {
		if (err)
			throw err;
		res.json(tran.transactions.id(req.params.transactionId));
	});
})
//TODO
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

//REQUESTS - done
router.route('/requests')
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
router.route('/requests/:requestId').put(function (req, res, next) {
	if (isLoggedIn(req, res)) {
		requests.findByIdAndUpdate(req.params.requestId, {
			$set: req.body //assuming body contains the update
		}, {
			new: true
		}, function (err, freq) {
			if (err)
				throw err; //propagate error
			if (freq.status == "ACCEPTED" && freq.receiver == req.user.username) {
				req.user.friends_list.push(freq.sender); //push to the comments collection
				req.user.save(function (err, updatedUser) {
					if (err)
						throw err;

				});
				users.findOne({
					username: freq.sender
				}, function (err, foundUser) {
					if (err)
						throw err;

					foundUser.friends_list.push(freq.receiver); //push to the comments collection
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
		res.redirect("/home")
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
