module.exports = [
    {
        api: '/api/v1/yelp/query',
        controller: 'yelp',
        method: {
            get: 'searchYelp'
        }
    }
];
