var express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
var dbase = require('../database/index.js')

var data = require('../data.json');

var tocken = 'b9e47bdf98987304688ed901cb55a34560432be5';


// var data = 		{
// 								user: 'sara', 
// 								repos: [
// 													{name: 'donkey', url: 'dammy url', discrition: ' this is dammy data'}, 
// 													{name: 'donkey', url: 'dammy url', discrition: ' this is dammy data'}
// 												]
// 							};


var app = express();
app.use(bodyParser());
var url = 'https://api.github.com';
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
	let username = req.body.Body;
	console.log("request body-> ",req.body.Body);

	var createInstacne = function(obj) {
	var Db = new dbase(obj);
	Db.save(function (err, Db) {
		if (err) return console.error(err);
		console.log('saved the data in the database');
	});

}
	var options = {
    url: 'https://api.github.com/users/' + username + '/repos?access_tocken='+tocken,
    method: 'GET',
    headers: {'user-agent': 'sara3'}
	};

	request.get(options, function (error, response, body) {

		var dbObj = {
			name: username,
			repos: []
		}
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body recieved from github'); 
	 let bdy = JSON.parse(body);
	 //et bdy = data;
	  let rep = {};
		for (let i = 0; i < bdy.length; i++) {
			rep.description = bdy[i].description;
			rep.name = bdy[i].name;
			rep.url = bdy[i].url;
			dbObj.repos.push(rep);
		 }
		 createInstacne(dbObj);
	});

  res.end('Data recieved from post');
});

app.get('/repos', function (req, res) {
  console.log("get request is called ");
  var data = JSON.stringify({limit: 25, sort: {'epoch': -1}});
	dbase.find((err, data) => {
		if (err) return console.error(err);
		//console.log('---',data);
		data = JSON.stringify(data);
		res.end(data);
	}).sort().limit(25);

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

