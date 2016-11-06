'use strict';

var Server = require('./server.main.js');
var app = new Server();

app.init();

return app.load([
    'sSearch',
    'sContext',
    'sYelpAdapter',
    'sWatson',
    'sApp'
]).then(function(hyper) {
    return hyper.start();
});
