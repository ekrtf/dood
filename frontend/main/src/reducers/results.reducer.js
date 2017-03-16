import { assign, isEmpty } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    version: null,
    selectedItem: {},
    isFetching: false,
    hasSearchFailed: false,
    isPosting: false,
    results: null
};

const results = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SET_VERSION:
            // nuke results when switching version
            if (state.version !== action.version) {
                return assign({}, state, {
                    results: null,
                    selectedItem: {},
                    version: action.version
                });
            }
            return assign({}, state, {
                version: action.version
            });

        case types.SMART_SEARCH_SUCCESS:
            return assign({}, state, {
                hasSearchFailed: isEmpty(action.results),
                results: action.results
            });

        case types.SMART_SEARCH_FAILURE:
            return assign({}, state, {
                hasSearchFailed: true
            });

        case types.SMART_SEARCH_SUCCESS:
            return assign({}, state, {
                hasSearchFailed: isEmpty(action.results),
                results: action.results
            });

        case types.POST_SEARCH_SUCCESS:
            return assign({}, state, {
                results: action.results,
                hasSearchFailed: isEmpty(action.results),
                isPosting: false
            });

        case types.POST_SEARCH_FAILURE:
            return assign({}, state, {
                hasSearchFailed: true,
                isPosting: false
            });

        case types.SELECT_ITEM_REQUEST:
            return assign({}, state, {
                isFetching: true
            });

        case types.SELECT_ITEM_SUCCESS:
            return assign({}, state, {
                selectedItem: action.selectedItem,
                isFetching: false
            });

        case types.SELECT_ITEM_FAILURE:
            return assign({}, state, {
                isFetching: false
            });

        default:
            return state;
    }
};

export default results;
