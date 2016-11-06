module.exports = [
    {
        api: '/api/v1/context',
        controller: 'context',
        method: {
            get: 'getContext'
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
