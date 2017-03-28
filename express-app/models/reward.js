//Ian + Troy
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RewardSchema = Schema({
		points: {
			type: Number,
			required: true
		},
	});

//Export model
module.exports = mongoose.model('Reward', RewardSchema);
