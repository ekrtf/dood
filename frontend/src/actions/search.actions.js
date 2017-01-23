import * as types from './action-types';
import http from '../utils/http';

// "server returns user location (i.e. user allowed browser to access location)"
export function getUserLocation(browserCoords) {
    return (dispatch) => {
        dispatch(userLocationRequest(browserCoords));
        return http.get('/context/reverseloc', browserCoords.location)
            .then(response => dispatch(userLocationSuccess(response)))
            .catch(e => dispatch(userLocationFailure(e)));
    };
}

function userLocationRequest() {
    return {
        type: types.USER_LOCATION_REQUEST
    };
}

function userLocationSuccess(location) {
    return {
        type: types.USER_LOCATION_SUCCESS,
        userLocation: location[0].city
    };
}

function userLocationFailure() {
    return {
        type: types.USER_LOCATION_FAILURE
    };
}

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

// "user types in textarea"
export function userInputChange(userInput) {
    return {
        type: types.USER_INPUT_CHANGE,
        userInput
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

// "user submits SMART search"
export function smartSearch(userInput) {
    return (dispatch) => {
        dispatch(smartSearchRequest(userInput));
        return http.post('/smart-search', { search: userInput })
            .then(response => dispatch(smartSearchSuccess(response)))
            .catch(e => dispatch(smartSearchFailure(e)));
    };
}

function smartSearchRequest(userInput) {
    return {
        type: types.SMART_SEARCH_REQUEST,
        input: userInput
    };
}

function smartSearchSuccess(results) {
    return {
        type: types.SMART_SEARCH_SUCCESS,
        results
    };
}

function smartSearchFailure(error) {
    return {
        type: types.SMART_SEARCH_FAILURE,
        error
    };
}
