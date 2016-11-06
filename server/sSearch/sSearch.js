/**
 * @module SearchService
 * @description interprates user queries
 */

module.exports = SearchService;

function SearchService($resource) {
    $resource.add('searchStore', require('./sSearch.resource.datastore.js'));
}
