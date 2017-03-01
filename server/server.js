'use strict';

const Server = require('./server.app.js');
const app = new Server();
app.load([
    'sSearch',
    'sContext',
    'sYelp',
    'sFoursquare',
    'sWatson',
    'sAnalytic'
]).then((hyper) => hyper.start());
