var user = function (){

	var mongoose = require('mongoose')
		, db = mongoose.connection
		, userModel = require('../model/userModel')
		, crypto = require('crypto')
		, passwordHash = require('password-hash');

	// mongoose.connect('mongodb://localhost:27017/sigan');

	this.register = function(data, callback) {

		var passSalt = crypto.randomBytes(5).toString('hex') //create random byte for salt
			, hashedPassword =  passwordHash.generate(data.password + passSalt); //hashed password using salt and pass

		data.token = null;
		data.password = hashedPassword;
		data.salt = passSalt;

		userModel.checkUserExistByEmail(data.email)
		.then( function(cb) {
			if (cb) throw new Error('Email already exist');
			else return data.username;
		})
		.then(userModel.checkUserExistByUsername)
		.then( function (cb) {
			if (cb) throw new Error('Username already exist');
			else return data;
		})
		.then( userModel.addUser )
		.then( function(cb) {
			callback({
				isRegister: true ,
				error_message: null
			});
		})
		.catch( function(err) {
			callback({
				isRegister: false ,
				error_message: err.message
			});
		})
		.finally( function(){
			console.log("Process register end");
		});
	};

	this.login = function (data, callback) {

		userModel.findByEmail(data.email)
		.then( function ( user ) {
			if (!user) throw new error('Sorry email not yet register')
			else return user;
		})
		.then( function ( user ) {
			console.log(passwordHash.verify( data.password + user.salt , user.password ));
			if (passwordHash.verify( data.password + user.salt , user.password )) {

				user.token = crypto.randomBytes(10).toString('hex');
				return user;

			} else {
				throw new Error('Sorry wrong password');
			}
		})
		.then( userModel.updateToken )
		.then( function (cb) {
			callback({
				islogin : true ,
				key : cb.token ,
				userid : cb._id
			});
		})
		.catch( function(err) {
			callback({
				isLogin: false ,
				error_message: err.message
			});
		})
		.done( function () {
			console.log('Process login end');
		});

	};

	this.logout = function (data, callback) {
		userModel.checkToken(data)
		.then( function (cb) {
			if (!cb) {
				throw new Error ('Wrong token')
			} else {
				data.token = null;
				return data;
			}
		})
		.then( userModel.updateToken )
		.then( function (cb) {
			callback({ isLogout: true });
		})
		.catch( function (err) {
			callback({
				isLogout: false ,
				error_message: err.message
			});
		})
		.done( function () {
			console.log('Process logout end');
		});
	};

	this.allMember = function (callback) {
		userModel.getAllMember()
		.then( function (users) {
			callback(users)
		})
		.catch( function (err) {
			callback({
				isError: true ,
				error_message: err.message
			});
		})
		.done( function () {
			console.log('Process get all member end');
		});
	};

};

module.exports = new user();
