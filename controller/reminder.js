var reminder = function (){

	var mongoose = require('mongoose')
		, db = mongoose.connection
		, userModel = require('../model/userModel.js');

	// mongoose.connect('mongodb://localhost:27017/sigan');

	this.post = function(data, callback) {

		var reminder = new reminderModel(data);

		reminder.save(function (err, reminder) {
  			if (err) return console.error(err);
  			callback(reminder);
		});

	};

	this.getReminder = function (data, callback) {
		

	}

};

module.exports = new reminder();