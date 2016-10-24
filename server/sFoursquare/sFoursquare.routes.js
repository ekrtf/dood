module.exports = [
    {
        api: '/api/v1/foursquare',
        controller: 'foursquare',
        method: {
            post: 'searchFoursquare'
        }
    },
    {
        api: '/api/v1/foursquare/details/:venueId',
        controller: 'foursquare',
        method: {
            get: 'getFoursquareVenueDetails'
        }
    },
    {
        api: '/api/v1/foursquare/categories',
        controller: 'foursquare',
        method: {
            get: 'getFoursquareCategories'
        }
    }
];
