const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	username: {
		type: String,
		lowercase: true,
		required: [true, 'Cant be blank'],
		match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
		index: {unique: true}
	},
	password: {
		type: String,
		required: [true, 'Cant be blank']
	}
});

userSchema.pre('save', function(next){
	let user = this;
	if(!user.isModified('password')) return next();
	bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
		if(err) return next(err);
		user.password = hash;
		next();
	});
});
userSchema.methods.comparePass = function(testPass, callback) {
	let user = this;
	bcrypt.compare(testPass, user.password, function(err, isMatch){
		if(err) return callback(err);
		callback(null, isMatch);
	});
}
module.exports = mongoose.model('users', userSchema);