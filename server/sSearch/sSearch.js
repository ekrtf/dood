/**
 * @module SearchService
 * @description interprates user queries
 */

module.exports = SearchService;

function SearchService($resource) {
    $resource.add('searchModel', require('./sSearch.resource.model.js'));
}
