'use strict';

const co = require('co');
const knex = require('knex');

module.exports = function(config) {
    let db = knex(config);

    return co(function*() {
        yield db.schema.createTableIfNotExists('Feedback', (feedback) => {
            feedback.increments();
            feedback.text('feedbackId').notNullable();
            feedback.string('searchId').notNullable();
            feedback.text('comment').notNullable();
            feedback.string('version').notNullable(); // 'smart' or 'clone'
            feedback.integer('rating').notNullable();
            feedback.string('email')
            feedback.bigInteger('createdAt').notNullable();
        });

        return db;
    });
}
