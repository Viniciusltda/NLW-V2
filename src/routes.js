const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index');

});

routes.get('/study', (req, res) => {
    res.render('study');

});

routes.get('/teach', (req, res) => {
    res.render('teach');

});

routes.get('/success', (req, res) => {
    res.render('success');
    
});


module.exports = routes;

