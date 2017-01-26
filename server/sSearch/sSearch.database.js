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
        yield db.schema.createTableIfNotExists('Searches', (search) => {
            search.text('searchId').notNullable().primary();
            search.string('location').notNullable();
            search.string('term').notNullable();
            search.timestamp('createdAt').notNullable();
        });

        yield db.schema.createTableIfNotExists('Results', (result) => {
            result.text('resultId').notNullable().primary();
            result.string('searchId').notNullable().references('searchId').inTable('Searches');
            result.string('sourceId').notNullable();
            result.string('sourceName').notNullable();
            result.string('imageUrl');
            result.string('name');
            result.string('price');
            result.integer('rating');
            result.json('coordinates');
            result.json('categories');
            result.json('images');
            result.json('reviews');
            result.json('location');
            result.timestamp('createdAt').notNullable();
        });

        yield db.schema.createTableIfNotExists('Keywords', (key) => {
            key.text('keywordId').notNullable().primary();
            key.string('userInput').notNullable();
            key.string('keyword').notNullable(); // store several
            key.timestamp('createdAt').notNullable();
        });

        return db;
    });
}
