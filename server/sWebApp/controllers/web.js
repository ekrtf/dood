'use strict';

const path = require('path');
const fs = require('fs');

module.exports = Web;

function Web() {
    const indexPath = path.join(__dirname, '../../../frontend/main/dist/index.html');
    this.index = fs.readFileSync(indexPath, 'utf8');

    const adminPath = path.join(__dirname, '../../../frontend/admin/dist/index.html');
    this.admin = fs.readFileSync(adminPath, 'utf8');
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

Web.prototype.serveWebApp = function($error, $done, $service, $rawResponse) {
    $rawResponse.send(this.index);
};

Web.prototype.serveAdminDashboard = function($rawResponse) {
    $rawResponse.send(this.admin);
};

Web.prototype.adminLogin = function($input, $done, $service, $error) {
	const username = $input.body.user;
	const pw = $input.body.pw;

	if (username === 'emile' && pw === 'DOOD-ucl-carrots-9876') {
		$done();
	} else {
		$error();
	}
};
