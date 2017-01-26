'use strict';

const co = require('co');
const knex = require('knex');

module.exports = function(config) {
    let db = knex({
        client: config.client,
        connection: {
            filename: config.connection.filename
        },
        useNullAsDefault: true
    });

    return co(function*() {
        yield db.schema.createTableIfNotExists('Feedback', (feedback) => {
            feedback.text('feedbackId').primary().notNullable();
            feedback.string('searchId'); // .references('Searches')
            feedback.string('comment');
            feedback.string('version'); // 'ml' or 'clone'
            feedback.integer('rating').notNullable();
            feedback.string('email')
            feedback.timestamp('createdAt').notNullable();
        });

        return db;
    });
}
