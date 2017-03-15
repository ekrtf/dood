import { assign, isEmpty } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    term: null,
    userInput: null,
    isPosting: false,
    userLocation: null,
    showLocationForm: false,
    showSuggestions: false,
    searchId: null,
    locationPredictions: null,
    hasSearchFailed: false
};

const search = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SET_VERSION:
            return assign({}, state, {
                hasSearchFailed: false
            });

        case types.LOCATION_AUTOCOMPLETE_SUCCESS:
            return assign({}, state, {
                locationPredictions: action.locationPredictions
            });

        case types.SET_LOCATION:
            return assign({}, state, {
                userLocation: action.userLocation
            });

        case types.TOGGLE_SUGGESTIONS:
            return assign({}, state, {
                showSuggestions: !state.showSuggestions
            });

        case types.TOGGLE_LOCATION:
            return assign({}, state, {
                showLocationForm: !state.showLocationForm
            });

        case types.TERM_CHANGE:
            return assign({}, state, {
                term: action.term
            });

        case types.USER_LOCATION_SUCCESS:
            return assign({}, state, {
                userLocation: action.userLocation
            });


        case types.USER_INPUT_CHANGE:
            return assign({}, state, {
                userInput: action.userInput
            });


        case types.POST_SEARCH_REQUEST:
            return assign({}, state, {
                isPosting: true,
                hasSearchFailed: false
            });

        case types.POST_SEARCH_SUCCESS:
            return assign({}, state, {
                isPosting: false,
                hasSearchFailed: isEmpty(action.results),
                searchId: action.searchId
            });

        case types.POST_SEARCH_FAILURE:
            return assign({}, state, {
                isPosting: false,
                hasSearchFailed: true
            });


        case types.SMART_SEARCH_REQUEST:
            return assign({}, state, {
                hasSearchFailed: false,
                isPosting: true
            });

        case types.SMART_SEARCH_SUCCESS:
            return assign({}, state, {
                isPosting: false,
                hasSearchFailed: isEmpty(action.results),
                searchId: action.searchId
            });

        case types.SMART_SEARCH_FAILURE:
            return assign({}, state, {
                isPosting: false,
                hasSearchFailed: true
            });


        default:
            return state;
    }
};

export default search;
