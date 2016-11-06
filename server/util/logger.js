var colors = require('colors');

module.exports = logger;

function logger() {

}

logger.prototype.str = function(string) {
    console.log(JSON.stringigy(string, null, 2));
};

logger.porotype.warn = function(string) {

};

logger.prototype.error = function(string) {

};
