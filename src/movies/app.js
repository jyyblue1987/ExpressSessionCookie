// app.js
const express = require('express');
const app = express();
var session = require('express-session');

const Movie = require('./db');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.get('/', function(req, res) {
    res.redirect('/movies');    
});

app.get('/movies', function(req, res) {
    var query = req.query;    
    if( !query.director )
        query = {};

    Movie.find(query, function(err, varToStoreResult, count) {
        res.render('movie', {list:varToStoreResult, director:query['director']});
    });
});

app.get('/mymovies', function(req, res) {
    if( !req.session.mymovies )
        req.session.mymovies = [];

    res.render('mymovie', {list:req.session.mymovies});
});

app.get('/movies/add', function(req, res) {
    res.render('movie.add.hbs', {});    
});

app.post('/movies/add', function(req, res) {
    var data = req.body;    

    console.log(JSON.stringify(data));
    data.year = Number(data.year);

    // your request handler that deals with POSTs will create a new movie in the database
    Movie.create(data, function (err, awesome_instance) {
        if (err) return handleError(err);

        if( !req.session.mymovies )
            req.session.mymovies = [];
        
        req.session.mymovies.push(data);
        console.log(JSON.stringify(req.session.mymovies));
        
        res.redirect('/movies');    
    });
});

app.use(express.static('public'));

app.listen(3000);


