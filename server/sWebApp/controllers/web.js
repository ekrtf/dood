'use strict';

const path = require('path');
const fs = require('fs');

module.exports = Web;

function Web() {
    const indexPath = path.join(__dirname, '../../../frontend/main/dist/index.html');
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

Web.prototype.adminLogin = function($input, $done, $service, $error) {
	const username = $input.body.user;
	const pw = $input.body.pw;

	if (username === 'emile' && pw === 'd00d2017') {
		$done();
	} else {
		$error();
	}
};
