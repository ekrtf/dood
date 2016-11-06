/**
 * @module ContextService
 * @description get context data: location, user, weather
 */

module.exports = ContextService;

function ContextService($resource) {
    $resource.add('contextStore', require('./sContext.resource.datastore.js'));
}
