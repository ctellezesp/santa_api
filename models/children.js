const mongoose = require('mongoose');
const childrenSchema = new mongoose.Schema({
	name: {
		type: String
	},
	date_birth: {
		type: String
	},
	address: {
		type: String
	},
	evil: {
		type: Boolean
	}
});
module.exports = mongoose.model('children', childrenSchema);