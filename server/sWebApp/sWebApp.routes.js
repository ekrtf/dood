module.exports = [
    {
        api: '/',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/ml',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/clone',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/results',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/results/:resultId',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/feedback',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        api: '/finish',
        controller: 'web',
        method: {
            get: 'serveWebApp'
        }
    },
    {
        static: '../../frontend/dist'
    },
    {
        default: {
            static: '../../frontend/dist/index.html'
        }
    }
]
