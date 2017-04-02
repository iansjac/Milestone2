/**
Milestone 2
 **/

// uses express router
var express = require('express');
var thinderRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

thinderRouter.use(bodyParser.json());

//HOME
thinderRouter.route('/home')
.get(function (req, res, next) { //chained into route(), no semi-colon after the all implementation
	/**TO-DO**/
})

//LOG IN
thinderRouter.route('/users/log-in') // a second router is define using parameters.
.get(function (req, res, next) {
	/**TO-DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
})

//PROFILE
thinderRouter.route('/profile') // a second router is define using parameters.
.get(function (req, res, next) {

	/**TO-DO**/
})
.put(function (req, res, next) {

	/**TO-DO**/
});

//FRIENDS LIST
thinderRouter.route('/friends-list') // a second router is define using parameters.
.get(function (req, res, next) {
	/**TO-DO**/

})
.delete (function (req, res, next) {

	/**TO-DO**/
});

//REQUESTS
thinderRouter.route('/requests')
.get(function (req, res, next) {

	/**TO-DO**/
})
.put(function (req, res, next) {
	/**TO-DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
});

//REVIEW TRANSACTION
thinderRouter.route('/user/:userId/requests/:transactionId')
.get(function (req, res, next) {

	/**TO-DO**/
})
.put(function (req, res, next) {
	/**TO-DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
});

//SEARCH
thinderRouter.route('/user/:userId')
.get(function (req, res, next) {

	/**TO-DO**/
})

//CREATE TRANSACTION
thinderRouter.route('/friends-list/:friendId/transactions/:transactionId')
.get(function (req, res, next) {

	/**TO-DO**/
})
.post(function (req, res, next) {
	/**TO-DO**/
});
module.exports = thinderRouter;
