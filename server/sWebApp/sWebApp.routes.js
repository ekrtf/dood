module.exports = [
    {
        api: '/admin/login',
        controller: 'web',
        method: {
            post: 'adminLogin'
        }
    },
    {
        api: '/admin',
        controller: 'web',
        method: {
            get: 'serveAdminDashboard'
        }
    },
    // {
    //     api: '/ml',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    // {
    //     api: '/clone',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    // {
    //     api: '/results',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    // {
    //     api: '/results/:resultId',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    // {
    //     api: '/feedback',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    // {
    //     api: '/finish',
    //     controller: 'web',
    //     method: {
    //         get: 'serveWebApp'
    //     }
    // },
    {
        static: [
            {
                from: '../../frontend/main/dist',
                to: '/main'
            },
            {
                from: '../../frontend/admin/dist',
                to: '/admin'
            }
        ]
    },
    {
        default: {
            static: '../../frontend/main/dist/index.html'
        }
    }
]
