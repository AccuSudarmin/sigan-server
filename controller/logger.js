var logger = function (){

	var mongoose = require('mongoose')
		, db = mongoose.connection
		, loggerModel = require('../model/loggerModel')
		, userModel = require('../model/userModel');

		this.read = function(data, callback) {
			userModel.checkToken({id: data.id, token: data.token})
			.then( function(cb) {
				if (cb) throw new Error('Wrong token');
				else return data;
			})
			.then(loggerModel.readNotif)
			.then( function (cb) {
				callback({
					isRead: true ,
					error_message: null
				})
			})
			.catch( function (err) {
				callback({
					isRead: false ,
					error_message: err.message
				})
			})
			.done( function () {
				console.log('Process read notif done');
			});
		}
};
module.exports = new logger();
