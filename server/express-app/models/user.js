//Troy + Ian
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = Schema({
		username: {
			type: String,
			max: 15,
			required: true,
			unique: true,
		},
		phone_number: {
			type: String,
			required: true,
			ref: 'FriendRequest'
		},
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		friends_list: [{
				type: String
			}
		],
		transactions: [{
				type: Schema.ObjectId
			}
		],
		friend_request: [{
				type: Schema.ObjectId
			}
		]
	});

UserSchema.plugin(passportLocalMongoose);

//Export model
module.exports = mongoose.model('User', UserSchema);
