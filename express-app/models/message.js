//Troy + Ian
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
		user1: {
			type: String,
			required: true,
		},
		user2: {

			type: String,
			required: true,
		},
        context: {
			type: String,
			required: true,
		}
		
	});

module.exports = mongoose.model('Message', MessageSchema);