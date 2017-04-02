// uses express router
var express = require('express');
var profileRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

profileRouter.use(bodyParser.json());

//PROFILE
profileRouter.route('/') // a second router is define using parameters.
.get(function (req, res, next) {
	/**TO-DO**/
	console.log("profile")
	res.render('index', { title: 'Profile' });
})
.put(function (req, res, next) {
	/**TO-DO**/
	
});

module.exports = profileRouter;