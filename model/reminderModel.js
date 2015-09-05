// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var reminderSchema = new Schema({
  	title: String ,
	content: String ,
	user: String ,
	year: int ,
	month: int ,
	day: int ,
	hour: int ,
	minute: int
});

// the schema is useless so far
// we need to create a model using it
var Reminder = mongoose.model('Reminder', reminderSchema);

// make this available to our users in our Node applications
module.exports = Reminder;