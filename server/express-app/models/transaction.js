//Ian + Troy
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = Schema({
		status: {
			type: String,
			required: true,
			enum: ['PENDING', 'ACCEPTED', 'COMPLETED']
		},
		receiver_type: {
			type: String,
			required: true,
			enum: ['BUY', 'SELL']
		},
		sender_type: {
			type: String,
			required: true,
			enum: ['BUY', 'SELL']
		},
		sender: {
			type: String,
			required: true
		},
		receiver: {
			type: String,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
	});

//Export model
module.exports = mongoose.model('Transaction', TransactionSchema);
