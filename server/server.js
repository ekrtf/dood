'use strict';

const Server = require('./server.app.js');
const app = new Server();
app.load([
    'sSearch',
    'sContext',
    'sYelp',
    'sFoursquare',
    'sWatson',
    'sZomato',
    'sAnalytic',
    'sWebApp'
]).then((hyper) => hyper.start());
