const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Letter = require('../models/letter');

//GET All Letters
router.get('/', (req, res, next) => {
	Letter.find({})
	.then(result => {
		if(result.length) {
  			res.status(200).json({result});
  		}
	})
	.catch(next);
});

//POST Children
router.post('/', (req, res, next) => {
	const body = req.body;
	Letter.create(body)
	.then(result => {
		if(result) {
			res.status(201).json({
				message: "letter created",
				letter: result
			})
		}
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	Letter.findById(id)
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "You find the letter",
				letter: result
			});
		} else {
			res.status(404).send("letter not found");
		}
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let body = req.body;
	Letter.findByIdAndUpdate(id, body, {new: true})
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "Letter Modificated",
				letter: result
			});
		} else {
			res.status(404).send("Cant update, this letter");
		}
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	Letter.findByIdAndRemove(id)
	.then(() => {
		res.status(404).json({
			message: "letter deleted correctly"
		});
	})
	.catch(next);
});

module.exports = router;