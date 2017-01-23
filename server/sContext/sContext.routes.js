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
    }
];
