const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .then(result => {
  	if(result.length) {
  		res.status(200).json({result});
  	}
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
	const body = req.body;
	User.create(body)
	.then(result => {
		if(result) {
			res.status(201).json({
				message: "sign up complete",
				user: result
			})
		} else {
			next({
				message: "Cant create user",
				name: "invalid"
			})
		}
	})
	.catch(next);
});

router.post('/login', (req, res, next) => {
	const body = req.body;
	if(!body["username"] || !body["password"]) 
		res.status(404).send("Params not found");
	User.findOne({username: body["username"]})
	.then(result => {
		/*if(body["password"] == result.password)
			res.status(200).json({
				message: "Sign up completed"
			})
		else res.status(404).json({
			message: "Not found"
		})*/
		if(result) {
			result.comparePass(body.password, function(err, isMatch) {
				if(err) throw(err);
				if(isMatch) {
					res.status(200).json({
						message: "Sign up completed"
					});
				} else {
					next({
						message: "Username or password are incorrect",
						name: "Forbidden"
					});
				}
			})
		}
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	User.findByIdAndRemove(id)
	.then(() => {
		res.status(204).json({
			message: "Dog Deleted correctly"
		});
	})
	.catch(next);
});


module.exports = router;