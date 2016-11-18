module.exports = [
    {
        api: '/api/v1/search',
        controller: 'search',
        method: {
            post: 'doSearch'
        }
    },
    {
        api: '/api/v1/search/details/:itemId',
        controller: 'search',
        method: {
            get: 'getItemDetails'
        }
    }
];
