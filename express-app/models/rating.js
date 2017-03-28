//Troy + Ian 
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RatingSchema = Schema({
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true
		},
		rater: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},

	});


//Export model
module.exports = mongoose.model('Rating', RatingSchema);
