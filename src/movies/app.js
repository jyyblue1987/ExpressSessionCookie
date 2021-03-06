// app.js
const express = require('express');
const app = express();
const Movie = require('./db');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.get('/movie', function(req, res) {
    Movie.find({}, function(err, varToStoreResult, count) {
        console.log(varToStoreResult); // <---- variable contains found documents!
        
        res.render('movie', {list:varToStoreResult});
    });
});

app.listen(3000);


