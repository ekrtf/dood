'use strict';

const prodConfig = {
    client: 'pg',
    connection: {
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        database : process.env.RDS_DB_NAME,
        ssl      : true
    },
    pool: {
        min: 2,
        max: 10
    }
};

var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DB_NAME,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

console.log('\n\n\n\nPG CONFIG: ', config)


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  console.log('\n\n\n\n\n\n\n\nall good\n\n\n\n\n\n\n\n\n')
  console.log('client')
  done();
});

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

const devConfig = {
    "client": "sqlite",
    "connection": {
        "filename": "dood.sqlite"
    },
    "useNullAsDefault": true
};

// const databaseConfig = process.env.ENV === 'prod' ? prodConfig : devConfig;
// HACK. unable to connect to real postgre
const databaseConfig = devConfig;

module.exports = {
    "token": "b350bbb9-0c95-4679-bbb9-1e4a7f524b0e",
    "ports": {
        "server": 4000
    },
    "env": "dev",
    "sYelp": {
        "appId": "eJEgUTjJxSJZcG1GwnivDg",
        "appSecret": "QqZh3Xw2wYrpiXsOY4iiHXkiPxL7k7J6zWFsdiHOaMX1uDXd4CiEWfHovrrMggqb"
    },
    "sSearch": {
        "database": databaseConfig
    },
    "sAnalytic": {
        "database": databaseConfig
    },
    "sWatson": {
        "credentials": {
            "url": "https://gateway-a.watsonplatform.net/calls",
            "username": "df4ebe50-08e4-4108-9f1c-46d7cfa223ac",
            "password": "yKzzzjocLnAy",
            "apiKey": "ad928a3256912c856f159ed2d5ac55409db1d3c1"
        }
    },
    "sContext": {
        "geocoder": {
            "key": "18b40446a2f75111a44ad6636c52951e"
        },
        "forecast": {
            "key": "95f0d13da1b7180723bb9c87d6c185b8"
        }
    },
    "sFoursquare": {
        "clientId": "QFIFTFK21S5DCRDL3YY1VF0LBHVEOLHEZWUW235TBAHDTEME",
        "clientSecret": "Q42LB1SXYEI1LLRQKR0FC1GHT01DHFXA2KD4SF0QJZPGW15W"
    },
    "sZomato": {
        "apiKey": "9756514d54c19b1841cb1f8713a35f24"
    },
    "sGooglePlaces": {
        "apiKey": "AIzaSyBTUge9awC7NP_B488VOaiOeezbXC2Vlpo"
    }
};
