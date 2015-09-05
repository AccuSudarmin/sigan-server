var MLogger = function () {
  var mongoose = require('mongoose')
    , q = require('q');

  var Schema = mongoose.Schema;

  // create a schema
  var loggerSchema = new Schema({
    user: String ,
	  description: String ,
	  type: String ,
    read: Boolean
  });

  var loggerModel = mongoose.model('Logger', loggerSchema);

  this.addNotif = function (data) {
    var deferred = q.defer()
			, Logger = new loggerModel(data);

		Logger.save(function (err, data) {
  		if (err) deferred.reject(err);
			else deferred.resolve(true);
		});

		return deferred.promise;
  }

  this.readNotif = function (data) {
    var deferred = q.defer();

    friendModel.findByIdAndUpdate(data, { 'read': true }, { new: true }, function (err, user) {
      if (err) deferred.reject(err);
  		else deferred.resolve(true);
  	});

  	return deferred.promise;
  }
}

module.exports = new MLogger;
