'use strict';

const Server = require('./server.app.js');
const app = new Server();
app.load([
    'sSearch',
    'sContext',
    'sYelp',
    'sWatson',
    'sAnalytic'
]).then((hyper) => hyper.start());
