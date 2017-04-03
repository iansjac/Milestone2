//Troy + Ian
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
		transactions: [{
				type: Schema.ObjectId
			}
		],
		friend_request: [{
				type: Schema.ObjectId
			}
		]
	});

//Export model
module.exports = mongoose.model('User', UserSchema);
