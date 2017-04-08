// uses express router
var express = require('express');
var profileRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');
var users = require('../models/user');

profileRouter.use(bodyParser.json());

//PROFILE
profileRouter.route('/') 
.get(function (req, res, next) {
	users.find({}, function(err, user){  
		   if (err) throw err; 
		   res.json(user); 
	   });
	console.log("profile")
	res.render('index', { title: 'Profile' });
})
.put(function (req, res, next) {
		users.findByIdAndUpdate(req.params.userId, {
		      $set:req.body 
		   },{
			   new: true
		   }, function (err, user){
				if (err) throw err; 
				res.json(user);
		   
	});
	
});

module.exports = profileRouter;