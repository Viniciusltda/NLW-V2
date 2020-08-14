const express = require('express');
const route = require('./routes');

const App = express();

App.use(express.static('public'));

App.set('views', __dirname + '/views');
App.set('view engine', 'pug');

App.use(route);

App.listen(3000, () => {
    console.log('Server allocated on port 3000');

});