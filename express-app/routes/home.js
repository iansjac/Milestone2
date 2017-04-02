// uses express router
var express = require('express');
var homeRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');

homeRouter.use(bodyParser.json());

//HOME
homeRouter.route('/')
.get(function (req, res, next) { 
	/**TO-DO**/
	res.render('index', { title: 'Home !' });
	console.log("home")
});

module.exports = homeRouter;