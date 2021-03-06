// app.js
const express = require('express');
const app = express();
const Movie = require('./db');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.get('/movie', function(req, res) {
    var query = req.query;    
    if( !query.director )
        query = {};

    Movie.find(query, function(err, varToStoreResult, count) {
        console.log(varToStoreResult); // <---- variable contains found documents!

        res.render('movie', {list:varToStoreResult, director:query['director']});
    });
});

app.get('/movie/add', function(req, res) {
    res.render('movie.add.hbs', {});    
});

app.post('/movie/add', function(req, res) {
    var data = req.body;    

    console.log(JSON.stringify(data));
    data.year = Number(data.year);

    // your request handler that deals with POSTs will create a new movie in the database
    Movie.create(data, function (err, awesome_instance) {
        if (err) return handleError(err);
        
        res.redirect('/movie');    
    });
});

app.use(express.static('public'));

app.listen(3000);


