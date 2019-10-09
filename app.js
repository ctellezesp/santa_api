const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const childrenRouter = require('./routes/children');
const letterRouter = require('./routes/children');

mongoose.connect('mongodb://127.0.0.1:27017/santaDB', {
	useNewUrlParser: true, useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/children', childrenRouter);
app.use('/letter', letterRouter);
app.get('*', (req,res) => {
	res.status(404).send('Route not found');
});
app.use((error, req, res, next) => {
	if(error) {
		res.status(422).json({
			message: error.message,
			type: error.name
		})
	}
});
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
});
module.exports = app;
