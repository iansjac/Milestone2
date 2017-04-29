var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendRequestSchema = Schema({
		status: {
			type: String,
			required: true,
			enum: ['PENDING', 'ACCEPTED']
		},
		sender: {
			type: String,
			required: true
		},
		receiver: {
			type: String,
			required: true
		},
	});


//Export model
module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
