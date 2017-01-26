/**
 * @module SearchService
 * @description interprates user queries
 */

module.exports = AnalyticService;

function AnalyticService($resource) {
    $resource.add('analyticModel', require('./sSearch.model.js'));
}
