var app = require('./core/app.js')
	, mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sigan'); //connecting database

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});