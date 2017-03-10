'use strict';

const Server = require('./server.js');
const app = new Server();
app.load([
    'sSearch',
    'sContext',
    'sYelp',
    'sFoursquare',
    'sWatson',
    'sZomato',
    'sGooglePlaces',
    'sAnalytic',
    'sWebApp'
]).then((hyper) => hyper.start());
