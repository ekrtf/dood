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

        /**
         * Reference each search operation executed on the site
         */
        yield db.schema.createTableIfNotExists('Searches', (search) => {
            search.increments();
            search.text('searchId').notNullable();
            search.string('version').notNullable(); // clone or smart
            search.string('location').notNullable();
            search.string('term').notNullable(); // whatever was sent to sources
            search.string('choice');
            search.bigInteger('creationTimestamp').notNullable();
        });

        /**
         * This saves a normalized result from one of the sources
         */
        yield db.schema.createTableIfNotExists('Results', (result) => {
            result.increments();
            result.text('resultId').notNullable();
            result.string('searchId').notNullable();
            result.string('idInSource').notNullable();
            result.string('sourceName').notNullable();
            result.string('imageUrl').notNullable();
            result.string('name').notNullable();
            result.string('price').notNullable();
            result.decimal('rating').notNullable();
            result.text('coordinates');
            result.text('categories').notNullable();
            result.text('images');
            result.text('reviews');
            result.text('description');
            result.text('addressLine').notNullable();
            result.text('addressDisplay').notNullable();
            result.bigInteger('creationTimestamp').notNullable();
        });

        /**
         * This table matches user inputs from smart search with
         * Watson keywords just to save time when users enter the
         * same query.
         */
        yield db.schema.createTableIfNotExists('Keywords', (key) => {
            key.increments();
            key.text('keywordId').notNullable();
            key.string('userInput').notNullable();
            key.string('keyword').notNullable(); // store several
            key.bigInteger('creationTimestamp').notNullable();
        });

        return db;
    });
}
