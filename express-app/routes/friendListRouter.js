
var express = require('express');
var friendListRouter = express.Router(); 
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
var friends = require('../models/user');

friendListRouter.use(bodyParser.json());

//FRIENDS LIST
friendListRouter.route('/:friends') 
.get(function (req, res, next) {
	friends.find({}, function(err, f){ 
		   if (err) throw err; 
		   res.json(f); 
	   });
	res.render('index', { title: 'Friends List' });
	console.log("friendlist")

});

friendListRouter.route('/:friends/friendId')

.delete(function(req, res, next){
	   friends.findByIdAndRemove(req.params.friendId, function (err, resp) 
			{        
				if (err) throw err;
				res.json(resp);
		});
});

//CREATE TRANSACTION
friendListRouter.route('/:friendId/transactions/:transactionId')
.get(function (req, res, next) {
	friends.findById(req.params.friendId, function (err, tran) {
        if (err) throw err;
        res.json(tran.transactions.id(req.params.transactionId)); 
    });
})
.post(function (req, res, next) {
	recipes.findById(req.params.friendId, function (err, recipe) {
        if (err) throw err;
        recipe.comments.push(req.body); //push to the comments collection
        recipe.save(function (err, recipe) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(recipe);
        });
    });
});

module.exports = friendListRouter;