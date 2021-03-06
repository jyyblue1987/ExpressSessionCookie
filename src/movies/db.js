// db.js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hw05');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// my schema goes here!
var Schema = mongoose.Schema;
var MovieSchema = new Schema({
    title: String,
    director: String,
    year: Number,
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;





