module.exports = [
    {
        api: '/api/v1/watson/conceptExpansion',
        controller: 'watson',
        method: {
            post: 'conceptExpansion'
        }
    },
    {
        api: '/api/v1/watson/languageAlchemy',
        controller: 'watson',
        method: {
            post: 'languageAlchemy'
        }
    }
];
