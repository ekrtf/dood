import _ from 'lodash';
import request from 'request-promise';

const TOKEN = 'b350bbb9-0c95-4679-bbb9-1e4a7f524b0e';

const API_BASE = __ENV__ === 'dev' ?
    'http://localhost:4000/api/v1' :
    'http://wwww.doodexperience.com/api/v1';

const baseHeader = {
    'Authorization': `Bearer ${TOKEN}`
};

const http = {
    get: (url, params) => {
        return request({
            method: 'GET',
            headers: baseHeader,
            uri: API_BASE + url,
            qs: params,
            json: true
        });
    },
    post: (url, data) => {
        return request({
            method: 'POST',
            headers: baseHeader,
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
