const mongoose = require('mongoose');
const childrenSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Cant be blank']
	},
	date_birth: {
		type: String,
		required: [true, 'Cant be blank']
	},
	address: {
		type: String,
		required: [true, 'Cant be blank']
	},
	evil: {
		type: Boolean,
		required: [true, 'Cant be blank']
	}
});
module.exports = mongoose.model('children', childrenSchema);