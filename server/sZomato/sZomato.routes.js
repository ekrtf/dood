module.exports = [
    {
        api: '/api/v1/zomato/search',
        controller: 'zomato',
        method: {
            get: 'searchZomato'
        }
    },
    {
        api: '/api/v1/zomato/details/:restaurantId',
        controller: 'zomato',
        method: {
            get: 'getZomatoRestaurantDetails'
        }
    }
];
