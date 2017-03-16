module.exports = [
    {
        api: '/api/v1/analytic/feedback',
        controller: 'analytic',
        method: {
            post: 'logFeedback'
        }
    },
    {
        api: '/api/v1/analytic/feedback/fetch/:version',
        controller: 'analytic',
        method: {
            get: 'getFeedback'
        }
    }
];
