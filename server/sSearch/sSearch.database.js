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
        let accountsTable = yield db.schema.createTableIfNotExists('Searches', (search) => {
            search.text('searchId').primary();
            // search.foreign('userId').references('Users');
            search.json('params');
            search.json('results');
            search.string('choice'); //.references('Result');
            search.timestamp('createdAt');
        });

        let transactionsTable = yield db.schema.createTableIfNotExists('Results', (results) => {
            results.text('resultId').primary();
            results.string('searchId');
            results.string('source');
            results.json('model');
            results.timestamp('createdAt');
        });

        return db;
    });
}
