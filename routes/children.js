const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Children = require('../models/children');

//GET All Children
router.get('/', (req, res, next) => {
	Children.find({})
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
	Children.create(body)
	.then(result => {
		if(result) {
			res.status(201).json({
				message: "Children created",
				children: result
			})
		} else {
			res.status(404).json({
				message: 'Data not found'
			});
		}
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	Children.findById(id)
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "You find the children",
				children: result
			});
		} else {
			res.status(404).send("Children not found");
		}
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let body = req.body;
	Children.findByIdAndUpdate(id, body, {new: true})
	.then(result => {
		if(result) {
			res.status(200).json({
				message: "Children Modificated",
				children: result
			});
		} else {
			res.status(404).send("Cant update, this children");
		}
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	Children.findByIdAndRemove(id)
	.then(() => {
		res.status(404).json({
			message: "Children deleted correctly"
		});
	})
	.catch(next);
});

module.exports = router;