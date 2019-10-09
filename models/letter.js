const mongoose = require('mongoose');
const letterSchema = new mongoose.Schema({
	children: {
		type: String
	},
	date_of_letter: {
		type: Date
	},
	gifts: {
		type: String
	}
});
module.exports = mongoose.model('letter', letterSchema);