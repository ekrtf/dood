import * as types from './action-types';
import http from '../utils/http';

// "user types in term input"
export function termChange(term) {
    return {
        type: types.TERM_CHANGE,
        term
    };
}

// "user types in destination input"
export function destinationChange(destination) {
    return {
        type: types.DESTINATION_CHANGE,
        destination
    };
}

// "user submits seach"
export function submitSearch(searchParams) {
    return (dispatch) => {
        dispatch(postSearchRequest(searchParams));
        return http.post('/search', searchParams)
            .then(response => dispatch(postSearchSuccess(response)))
            .catch(e => dispatch(postSearchFailure(e)));
    };
}

function postSearchRequest(searchParams) {
    return {
        type: types.POST_SEARCH_REQUEST,
        destination: searchParams.destination,
        term: searchParams.term
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
