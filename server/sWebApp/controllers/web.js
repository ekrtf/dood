'use strict';

const path = require('path');
const fs = require('fs');

module.exports = Web;

function Web() {
    const indexPath = path.join(__dirname, '../../../frontend/dist/index.html');
    this.index = fs.readFileSync(indexPath, 'utf8');
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

Web.prototype.serveWebApp = function($error, $done, $service, $rawResponse) {
    $rawResponse.send(this.index);
};
