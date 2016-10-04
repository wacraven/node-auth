'use strict';

const mongoose = require('mongoose')

//every collection needs a model
module.exports = mongoose.model('User', {
	username: String,
	password: String
});
