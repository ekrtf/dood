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
    }
};

const devConfig = {
    "client": "sqlite",
    "connection": {
        "filename": "dood.sqlite"
    },
    "useNullAsDefault": true
};

const databaseConfig = process.env.ENV === 'prod' ? prodConfig : devConfig;

module.exports = {
    "token": "your-internal-token",
    "ports": {
        "server": 4000
    },
    "env": "dev",
    "sYelp": {
        "appId": "",
        "appSecret": ""
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
            "username": "",
            "password": "",
            "apiKey": ""
        }
    },
    "sContext": {
        "geocoder": {
            "key": ""
        },
        "forecast": {
            "key": ""
        }
    },
    "sFoursquare": {
        "clientId": "",
        "clientSecret": ""
    },
    "sZomato": {
        "apiKey": ""
    },
    "sGooglePlaces": {
        "apiKey": ""
    }
};
