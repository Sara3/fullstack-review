var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
	console.log('opened connection');
});

var repoSchema = mongoose.Schema({
	name: String,
	repos: []
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;