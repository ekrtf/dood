import * as types from './action-types';
import http from '../utils/http';

// "user submits seach"
export function submitSearch(searchParams) {
    return (dispatch) => {
        dispatch(postSearchRequest(searchParams));
        return http('POST', '/search', searchParams)
            .then(response => dispatch(postSearchSuccess(response)))
            .catch(e => dispatch(postSearchFailure(e)));
    };
}

function postSearchRequest(searchParams) {
    return {
        type: types.POST_SEARCH_REQUEST,
        destination: searchParams.destination,
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate
    };
}

function postSearchSuccess(results) {
    return {
        type: types.POST_SEARCH_SUCCESS,
        results
    };
}

function postSearchFailure(error) {
    return {
        type: types.POST_SEARCH_FAILURE,
        error
    };
}