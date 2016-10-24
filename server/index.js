'use strict';

const https = require('https');
const fs = require('fs');
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
]).then((server) => server.start());