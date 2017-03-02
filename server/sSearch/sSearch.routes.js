module.exports = [
    {
        api: '/api/v1/search',
        controller: 'search',
        method: {
            post: 'cloneSearch'
        }
    },
    {
        api: '/api/v1/smart-search',
        controller: 'search',
        method: {
            post: 'smartSearch'
        }
    },
    {
        api: '/api/v1/search/details/:itemId',
        controller: 'search',
        method: {
            get: 'getItemDetails'
        }
    },
    {
        api: '/api/v1/search/choice',
        controller: 'search',
        method: {
            post: 'saveChoice'
        }
    }
];
