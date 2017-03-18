module.exports = [
    {
        api: '/api/v1/analytic/:version',
        controller: 'analytic',
        method: {
            get: 'getAnalytics'
        }
    },
    {
        api: '/api/v1/analytic/feedback',
        controller: 'analytic',
        method: {
            post: 'logFeedback'
        }
    }
];
