import * as types from './action-types';
import http from '../utils/http';

// "user click change location on smart search"
export function toggleLocationForm() {
    return {
        type: types.TOGGLE_LOCATION
    };
}

// "user blurs on location input on clone search"
export function toggleSuggestions() {
    return {
        type: types.TOGGLE_SUGGESTIONS
    };
}

// "user selected a location in the typeahead"
export function setUserLocation(userLocation) {
    return {
        type: types.SET_LOCATION,
        userLocation
    };
}

// "user types in location input"
export function locationChange(input) {
    return (dispatch) => {
        dispatch(locationAutocompleteRequest(input));
        return http.get('/places/autocomplete', { input })
            .then(res => dispatch(locationAutocompleteSuccess(res)))
            .catch(e => dispatch(locationAutocompleteFailure(e)));
    };
}

function locationAutocompleteRequest(input) {
    return {
        type: types.LOCATION_AUTOCOMPLETE_REQUEST,
        locationInput: input
    };
}

function locationAutocompleteSuccess(predictions) {
    return {
        type: types.LOCATION_AUTOCOMPLETE_SUCCESS,
        locationPredictions: predictions
    };
}

function locationAutocompleteFailure(e) {
    return {
        type: types.LOCATION_AUTOCOMPLETE_FAILURE,
        error: e
    };
}

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

// "user types in textarea"
export function userInputChange(userInput) {
    return {
        type: types.USER_INPUT_CHANGE,
        userInput
    };
}

// "user submits seach"
export function submitSearch() {
    return (dispatch, getState) => {
        const state = getState();
        const searchParams = {
            term: state.search.term,
            location: state.search.userLocation
        };
        dispatch(postSearchRequest(searchParams));
        return http.post('/search', searchParams)
            .then(response => dispatch(postSearchSuccess(response)))
            .catch(e => dispatch(postSearchFailure(e)));
    };
}

function postSearchRequest(searchParams) {
    return {
        type: types.POST_SEARCH_REQUEST
    };
}

function postSearchSuccess(response) {
    return {
        type: types.POST_SEARCH_SUCCESS,
        results: response.results,
        searchId: response.searchId
    };
}

function postSearchFailure(error) {
    return {
        type: types.POST_SEARCH_FAILURE,
        error
    };
}

// "user submits SMART search"
export function smartSearch() {
    return (dispatch, getState) => {
        const state = getState();

        // do not search twice at a time
        if (state.search.isPosting) return;

        const params = {
            search: state.search.userInput,
            location: state.search.userLocation
        };

        dispatch(smartSearchRequest());
        return http.post('/smart-search', params)
            .then(response => dispatch(smartSearchSuccess(response)))
            .catch(e => dispatch(smartSearchFailure(e)));
    };
}

function smartSearchRequest() {
    return {
        type: types.SMART_SEARCH_REQUEST
    };
}

function smartSearchSuccess(response) {
    return {
        type: types.SMART_SEARCH_SUCCESS,
        results: response.results,
        keywords: response.keywords,
        searchId: response.searchId
    };
}

function smartSearchFailure(error) {
    return {
        type: types.SMART_SEARCH_FAILURE,
        error
    };
}
