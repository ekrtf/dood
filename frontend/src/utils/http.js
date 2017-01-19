import _ from 'lodash';
import request from 'request-promise';

const API_BASE = 'http://localhost:4000/api/v1';

const http = {
    get: (url, params) => {
        return request({
            uri: API_BASE + url,
            qs: params,
            json: true
        });
    },
    post: (url, data) => {
        return request({
            method: 'POST',
            uri: API_BASE + url,
            body: data,
            json: true
        });
    },
    put: (url, data) => {

    },
    delete: (url, data) => {

    }
};

export default http;
