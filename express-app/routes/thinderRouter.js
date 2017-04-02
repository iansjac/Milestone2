/**
Troy Ingel
take home 4
**/

// uses express router
var express = require('express');
var emojiRouter = express.Router(); //create a router object
var bodyParser = require('body-parser');

/** 1- declare mongoose and emojies **/
var mongoose = require('mongoose');
var emojis = require('../models/emojis');

var emojiRouter = express.Router();
emojiRouter.use(bodyParser.json());

emojiRouter.route('/') 
.get(function(req,res,next){ //chained into route(), no semi-colon after the all implementation
      // 2- implement get  to return all emojis  
  	  emojis.find({}, function(err, emoji){  //get the emojis collection as an array,received as the emoji param
		   if (err) throw err; //propagate error
		   res.json(emoji); // convert to json and return in res
	   });
	   
})

.post(function(req, res, next){
	// 3- implement post request to insert emoji into database
	emojis.create(req.body, function (err, emoji){
		   if(err) throw err; //propagate error
		   
		   console.log('emoji created');
		   
		   var id = emoji._id
		   res.writeHead(200, {'Content-Type':'text-plain'}); //send reply back to the client with emoji id
		   res.end('Added the emoji with id:' + id);
		   
	});
})

.delete(function(req, res, next){
       // 4- delete deletes all emojis in the collection
	   emojis.remove({},function(err, resp){
		    if (err) throw err; //propagate error
			res.json(resp);
	   });
});

emojiRouter.route('/:emojiId') // a second router is define using parameters.

.get(function(req,res,next){
	
	  // 4- find by id 
      emojis.findById(req.params.emojiId, function(err, emoji){  //get the emojis collection as an array,received as the emoji param
		   if (err) throw err; //propagate error
		   res.json(emoji); // conert to jason and return in res
	   });
	 })

.put(function(req, res, next){
	// 5- implement post request to update a specific emoji
	emojis.findByIdAndUpdate(req.params.emojiId, {
		      $set:req.body   //assuming body contains the update
		   },{
			   new: true
		   }, function (err, emoji){
				if (err) throw err; //propagate error
				res.json(emoji);
		   
	});
        
})

.delete(function(req, res, next){
      // 6- delete specific emoji in the collection
	   emojis.findByIdAndRemove(req.params.emojiId, function (err, resp) 
			{        
				if (err) throw err;
				res.json(resp);
		});
});



module.exports = emojiRouter;