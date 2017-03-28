var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendRequestSchema = Schema({
		status: {
			type: String,
			required: true,
			enum: ['Sent', 'Accepted']
		},
		user: {
			type: String,
			required: true
		},
	});


//Export model
module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
