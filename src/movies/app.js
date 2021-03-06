// app.js
var Movie = require('./db');

Movie.find({year: 1977}, function(err, varToStoreResult, count) {
	console.log(varToStoreResult); // <---- variable contains found documents!
});
