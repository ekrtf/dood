module.exports = [
    {
        api: '/api/v1/foursquare',
        controller: 'foursquare',
        method: {
            get: 'searchFoursquare'
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
