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

        /**
         * Reference each search operation executed on the site
         */
        yield db.schema.createTableIfNotExists('Searches', (search) => {
            search.text('searchId').notNullable().primary();
            search.string('version').notNullable(); // clone or ML
            search.string('location').notNullable();
            search.string('term').notNullable(); // whatever was sent to sources
            search.string('choice').references('resultId').inTable('Results');
            search.timestamp('createdAt').notNullable();
        });

        /**
         * This saves a normalized result from one of the sources
         */
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

        /**
         * This table matches user inputs from smart search with
         * Watson keywords just to save time when users enter the
         * same query.
         */
        yield db.schema.createTableIfNotExists('Keywords', (key) => {
            key.text('keywordId').notNullable().primary();
            key.string('userInput').notNullable();
            key.string('keyword').notNullable(); // store several
            key.timestamp('createdAt').notNullable();
        });

        return db;
    });
}
