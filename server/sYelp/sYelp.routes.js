module.exports = [
    {
        api: '/api/v1/yelp/query',
        controller: 'yelp',
        method: {
            post: 'searchYelp'
        }
    },
    {
        api: '/api/v1/yelp/details/:yelpBusinessId',
        controller: 'yelp',
        method: {
            get: 'getYelpBusinessDetails'
        }
    }
];
