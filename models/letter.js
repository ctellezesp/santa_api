const mongoose = require('mongoose');
const letterSchema = new mongoose.Schema({
	children: {
		type: String,
		required: [true, 'Cant be blank']
	},
	date_of_letter: {
		type: String,
		required: [true, 'Cant be blank']
	},
	gifts: {
		type: Array,
		required: [true, 'Cant be blank']
	}
});
module.exports = mongoose.model('letter', letterSchema);