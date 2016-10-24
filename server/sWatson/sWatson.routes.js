module.exports = [
    {
        api: '/api/v1/watson/concepts',
        controller: 'watson',
        method: {
            post: 'concepts'
        }
    },
    {
        api: '/api/v1/watson/keywords',
        controller: 'watson',
        method: {
            post: 'keywords'
        }
    },
    {
        api: '/api/v1/watson/emotion',
        controller: 'watson',
        method: {
            post: 'emotion'
        }
    }
];
