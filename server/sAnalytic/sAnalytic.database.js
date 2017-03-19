'use strict';

const co = require('co');
const knex = require('knex');

module.exports = function(config) {
    let db = knex(config);

    return co(function*() {
        // MASSIVE HACK. To make it to deadline, horrifying db architecture
        // increments --> primary
        // text --> json
        // ...

        yield db.schema.createTableIfNotExists('Feedback', (feedback) => {
            feedback.increments();
            feedback.text('feedbackId').notNullable();
            feedback.string('searchId').notNullable();
            feedback.text('comment').notNullable();
            feedback.string('version').notNullable(); // 'smart' or 'clone'
            feedback.decimal('rating').notNullable();
            feedback.string('email')
            feedback.bigInteger('creationTimestamp').notNullable();
        });

        return db;
    });
}
