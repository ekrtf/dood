import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    version: null,
    selectedItem: {},
    isFetching: false,
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
                return _.assign({}, state, {
                    results: null,
                    selectedItem: {},
                    version: action.version
                });
            }
            return _.assign({}, state, {
                version: action.version
            });

        case types.SMART_SEARCH_SUCCESS:
            return _.assign({}, state, {
                results: action.results
            });

        case types.POST_SEARCH_SUCCESS:
            return _.assign({}, state, {
                results: action.results,
                isPosting: false
            });

        case types.SELECT_ITEM_REQUEST:
            return _.assign({}, state, {
                isFetching: true
            });

        case types.SELECT_ITEM_SUCCESS:
            return _.assign({}, state, {
                selectedItem: action.selectedItem,
                isFetching: false
            });

        case types.SELECT_ITEM_FAILURE:
            return _.assign({}, state, {
                isFetching: false
            });

        default:
            return state;
    }
};

export default results;
