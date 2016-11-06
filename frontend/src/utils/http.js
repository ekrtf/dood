import _ from 'lodash';
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/v1';

function Http(method, url, data, isFiles) {
    method = _.upperCase(method);
    url = _.includes(url, API_BASE) ? url : API_BASE + url;

    if (isFiles === 'files') {
        return axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => response.data).catch((err) => err);
    }

    switch(method) {
        case 'GET':
            return axios.get(url)
                .then((response) => response.data)
                .catch((err) => err);

        case 'POST':
            return axios.post(url, JSON.stringify(data))
                .then((response) => response.data)
                .catch((err) => err);
    }
}

export default Http;
