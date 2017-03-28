//Ian + Troy
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = Schema({
		type: {
			type: String,
			required: true,
			enum: ['Buy', 'Sell']
		},
		user: {
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
