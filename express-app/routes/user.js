// uses express router
var express = require('express');
var userRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

userRouter.use(bodyParser.json());

//LOG IN
userRouter.route('/log-in') // a second router is define using parameters.
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("log in")
	res.render('index', { title: 'Log In' });
})
.post(function (req, res, next) {
	/**TO-DO**/

});

//REVIEW TRANSACTION
userRouter.route('/:userId/requests/:transactionId')
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("review transaction")
	res.render('index', { title: 'Review Transaction' });
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
	res.render('index', { title: 'Search' });
})

module.exports = userRouter;
