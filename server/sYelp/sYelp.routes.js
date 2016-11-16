module.exports = [
    {
        api: '/api/v1/yelp/query',
        controller: 'yelp',
        method: {
            post: 'searchYelp'
        }
    },
    {
        api: '/api/v1/yelp/details/:yelpItemId',
        controller: 'yelp',
        method: {
            get: 'getItemDetails'
        }
    }
];
