module.exports = [
    {
        api: '/api/v1/context/reverseloc',
        controller: 'context',
        method: {
            get: 'getReverseLoc'
        }
    },
    {
        api: '/api/v1/context/outdoors',
        controller: 'context',
        method: {
            get: 'disableOutdoors'
        }
    },
    {
        api: '/api/v1/context/keywords/weather',
        controller: 'context',
        method: {
            post: 'getWeatherKeywords'
        }
    },
    {
        api: '/api/v1/context/keywords/date',
        controller: 'context',
        method: {
            post: 'getDateKeywords'
        }
    }
];
