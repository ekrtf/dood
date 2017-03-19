'use strict';

const config = require('./config.js');
const authorizationHeader = `Bearer ${config.token}`;

const checkAccessToken = function($rawRequest, $error) {
    const incomingAuth = $rawRequest.headers['authorization'];
    if (incomingAuth === authorizationHeader) {
        return true;
    } else {
        $error({
            code: 401,
            message: 'Access denied'
        }, 401);
    }
}

module.exports = {
    checkAccessToken
};
