var MUser = function (){
	var q = require('q')
		, mongoose = require('mongoose')
		, Schema = mongoose.Schema;

	// create a schema
	var userSchema = new Schema({
		firstname: String ,
		lastname : String ,
		username : String ,
		password : String,
		salt : String ,
		email : String ,
		token : String
	});

	var userModel = mongoose.model('User', userSchema);

	this.addUser = function (data){
		var deferred = q.defer()
			, User = new userModel(data);

		User.save(function (err, user) {
  		if (err) deferred.reject(err);
			else deferred.resolve(true);
		});

		return deferred.promise;
	};

	this.checkUserExistByEmail = function (data) {
		var deferred = q.defer();

		userModel.find({ email: data }, function(err, user) {
			if (err) return deferred.reject(err);

			if (user.length > 0) deferred.resolve(true)
			else deferred.resolve(false);

		});

		return deferred.promise;
	};

	this.checkUserExistByUsername = function (data) {
		var deferred = q.defer();

		userModel.find({ username: data }, function(err, user) {
			if (err) return deferred.reject(err);

			if (user.length > 0) deferred.resolve(true)
			else deferred.resolve(false);
		});

		return deferred.promise;
	};

	this.findByEmail = function (data) {
		var deferred = q.defer();

		userModel.findOne({ email: data }, function(err, user) {
			if (err) return deferred.reject(err);

			if (user) deferred.resolve(user)
			else deferred.resolve(false);
		});

		return deferred.promise;
	};

	this.checkToken = function (data) {
		var deferred = q.defer();

		userModel.findOne({
			$and: [
				{ '_id': data.id } ,
				{ 'token': data.token }
			]
		} , function ( err , updated ) {
			if ( err ) deferred.reject( err );

			if ( updated ) deferred.resolve ( true )
			else deferred.resolve ( false )
		});

		return deferred.promise;
	}

	this.updateToken = function (data) {
		var deferred = q.defer();

		userModel.findByIdAndUpdate(data.id , { 'token': data.token }, { new: true }, function (err, user) {
			if (err) deferred.reject(err);
			else deferred.resolve(user);
		});

		return deferred.promise;
	};

	this.getAllMember = function () {
		var deferred = q.defer();

		userModel.find({}, function(err, users) {
			if (err) deferred.reject(err);
			else deferred.resolve(users);
		});

		return deferred.promise;
	};

}

module.exports = new MUser;
