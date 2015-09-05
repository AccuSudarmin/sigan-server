var friends = function (){

	var mongoose = require('mongoose')
		, db = mongoose.connection
		, friendshipModel = require('../model/friendshipModel')
		, logger = require('../model/loggerModel')
		, userModel = require('../model/userModel');

	// mongoose.connect('mongodb://localhost:27017/sigan');

	this.addFriend = function (data, callback) {
		userModel.checkToken({'id': data.my_id, 'token': data.token})
		.then( function(cb) {
			if (cb) throw new Error('Wrong token');
			else return data;
		})
		.then( friendshipModel.add )
		.then ( function (cb) {
			callback({
				isFriend: true ,
				error_message: null
			});
		})
		.catch( function (err) {
			callback({
				isFriend: false ,
				error_message: "Failed add friend"
			})
		})
		.done( function () {
			console.log('Process add friend end');
		});
	};

	this.approveFriend = function (data, callback) {
		userModel.checkToken({'id': data.my_id, 'token': data.token})
		.then( function(cb) {
			if (cb) throw new Error('Wrong token');
			else return data;
		})
		.then( friendshipModel.approve )
		.then ( function (cb) {
			callback({
				isFriend: true ,
				error_message: null
			});
		})
		.catch( function (err) {
			callback({
				isFriend: false ,
				error_message: "Failed accept friendship"
			})
		})
		.done( function () {
			console.log('Process approve friend end');
		});
	};

};

module.exports = new friends();
