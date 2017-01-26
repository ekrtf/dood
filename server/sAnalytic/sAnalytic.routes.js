module.exports = [
    {
        api: '/api/v1/analytic/feedback',
        controller: 'analytic',
        method: {
            post: 'logFeedback'
        }
    }
];
