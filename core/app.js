var express = require('express')
	, bodyParser = require('body-parser')
	, app = express()
	, userCon = require('../controller/user')
	, friendsCon = require('../controller/friends')
	, reminderCon = require('../controller/reminder')
	, loggerCon = require('../controller/logger');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
	res.send('Hello World!');
});

//get all member
app.get('/allMember', function (req, res) {
	userCon.allMember(function(cb){
		res.send(JSON.stringify(cb));
	});
});

//register member
app.post('/register', function (req, res) {
	var data = {
		firstname: req.body.firstname ,
		lastname: req.body.lastname ,
		username: req.body.username ,
		email: req.body.email ,
		password: req.body.password
	};

	//saving user to database
	userCon.register(data, function (cb) {
		res.send(cb);
	});

});

//login member
app.post('/login', function (req, res) {

	var data = {
		password : req.body.password ,
		email : req.body.email ,
	};

	//callback login
	userCon.login(data, function (user) {
		res.send(user);
	});

});

//logout member
app.get('/logout/:id/:token', function (req, res) {

	var data = {id: req.params.id, token: req.params.token};

	userCon.logout(data, function (cb) {
		res.send(cb);
	});
});

//adding friends
app.get('/friendship/add/:id/:token/:friend', function (req, res) {

	var data = {my_id: req.params.id, token: req.params.token, friend_id: req.params.friend};

	friendsCon.addFriend(data, function (cb) {
		res.send(cb);
	});

});

app.get('/friendship/all/:id/:token', function (req, res) {

	var data = {id: req.params.id, token: req.params.token};

	friendsCon.myFriend(data, function (cb) {
		res.send(cb);
	});
});

app.get('/notification/read/:id/:token/:notif_id', function (req, res) {

	var data = {
		id: req.params.id ,
		toke: req.params.token ,
		notif_id: req.params.notif_id
	};

	Logger.read(data, function (cb) {
		res.send(cb);
	});
})

module.exports = app;
