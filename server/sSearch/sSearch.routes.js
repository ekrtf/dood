module.exports = [
    // Clone endpoints
    {
        api: '/api/v1/search',
        controller: 'search',
        method: {
            post: 'cloneSearch'
        }
    },
    {
        api: '/api/v1/search/details/:itemId',
        controller: 'search',
        method: {
            get: 'getItemDetails'
        }
    },

    // ML endpoints
    {
        api: '/api/v1/smart-search',
        controller: 'search',
        method: {
            post: 'smartSearch'
        }
    }
];
