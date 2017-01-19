import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    slectedItem: {},
    isFetching: false,
    results: []
};

const results = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SMART_SEARCH_SUCCESS:
            return _.assign({}, state, {
                results: action.results.slice(0, 4) // display only top 5
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
