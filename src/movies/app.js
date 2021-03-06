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
app.use(express.static('public'));

app.listen(3000);


