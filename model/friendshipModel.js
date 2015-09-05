var MFriend = function () {
  // grab the things we need
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  // create a schema
  var friendshipSchema = new Schema({
    friend_one: String ,
    friend_two: String ,
	  friend_one_approval: Boolean ,
    friend_two_approval: Boolean
  });

  var friendModel = mongoose.model('Friendship', friendshipSchema);

  this.add = function (data) {
    //remember friend one is the people request friendship
    var deferred = q.defer()
      , friendData = {};

    if (data.my_id > data.friend_id) {
      friendData.friend_one = data.my_id;
      friendData.friend_two = data.friend_id;
      friendData.friend_one_approval = true;
      friendData.friend_two_approval = false;
    } else {
      friendData.friend_one = data.friend_id;
      friendData.friend_two = data.my_id;
      friendData.friend_one_approval = false;
      friendData.friend_two_approval = true;
    }

    var Friends = new friendModel(friendData);
    Friends.save(function (err, user) {
    	if (err) deferred.reject(err);
  		else deferred.resolve(true);
  	});

    return deferred.promise;
  }

  this.aprrove = function (data) {
    var deferred = q.defer();

    if (data.my_id > data.friend_id) {
      friendModel.findOneAndUpdate({
        $and: [
          { 'friend_one': data.my_id } ,
          { 'friend_two': data.friend_id }
        ]
      } , { 'friend_one_approval': true }, { new: true }, function (err, user) {
        if (err) deferred.reject(err);
			  else deferred.resolve(true);
		  });
    } else {
      friendModel.findOneAndUpdate({
        $and: [
          { 'friend_one': data.friend_id } ,
          { 'friend_two': data.my_id }
        ]
      } , { 'friend_two_approval': true }, { new: true }, function (err, user) {
        if (err) deferred.reject(err);
			  else deferred.resolve(true);
		  });
    }

		return deferred.promise;
  }
}

// make this available to our users in our Node applications
module.exports = MFriend;
