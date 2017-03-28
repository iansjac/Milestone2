//Troy + Ian
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TransactionSchema = require('mongoose').model('Transaction').schema
	var RewardSchema = require('mongoose').model('Reward').schema
	var MessageSchema = require('mongoose').model('Message').schema
	var FriendRequestSchema = require('mongoose').model('FriendRequest').schema
	var RatingSchema = require('mongoose').model('Rating').schema

	var UserSchema = Schema({
		username: {
			type: String,
			required: true,
			max: 15,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			max: 20
		},
		phone_number: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		reward: {
			type: Schema.ObjectId,
			ref: 'Reward'
		},
		rating: {
			type: Schema.ObjectId,
			ref: 'Rating'
		},
		transactions: {
            type: Schema.ObjectId, 
            ref: 'TransactionSchema'
        },
		messages: {
            type: Schema.ObjectId,
            ref: 'MessageSchema'
        },
        friend_request: {
            type: Schema.ObjectId,
            ref: 'FriendRequestSchema'
        }
	});

//Export model
module.exports = mongoose.model('User', UserSchema);
