'use strict';

const prodConfig = {
    client: 'pg',
    connection: {
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        ssl      : true
    }
};

const devConfig = {
    "client": "sqlite",
    "connection": {
        "filename": "dood.sqlite"
    }
};

const databaseConfig = process.env.ENV === 'prod' ? prodConfig : devConfig;

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
