// uses express router
var express = require('express');
var requestsRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose **/
var mongoose = require('mongoose');
var requests = require('../models/friend-request');

requestsRouter.use(bodyParser.json());

//REQUESTS
requestsRouter.route('/')
.get(function (req, res, next) {
	 requests.find({}, function(err, freq){  
		   if (err) throw err; 
		   res.json(freq); 
	   });
	console.log("requests")
	res.render('index', { title: 'Requests' });
})
.put(function (req, res, next) {
	requests.findByIdAndUpdate(req.params.requestId, {
		      $set:req.body   //assuming body contains the update
		   },{
			   new: true
		   }, function (err, freq){
				if (err) throw err; //propagate error
				res.json(freq);
		   
	});
})
.post(function (req, res, next) {
		requests.create(req.body, function (err, freq){
		   if(err) throw err; //propagate error
		   
		   console.log('Created new Frined Request');
		   
		   var id = freq._id
		   res.writeHead(200, {'Content-Type':'text-plain'}); 
		   res.end('Added:' + id);
	});
});

module.exports = requestsRouter;