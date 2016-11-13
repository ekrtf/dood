import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    destination: '',
    fromDate: '',
    toDate: '',
    isPosting: false,
    results: []
};

const search = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.POST_SEARCH_REQUEST:
            return _.assign({}, state, {
                isPosting: true,
                destination: action.destination,
                fromDate: action.fromDate,
                toDate: action.toDate
            });

        case types.POST_SEARCH_SUCCESS:
            return _.assign({}, state, {
                results: action.results,
                isPosting: false
            });

        case types.POST_SEARCH_FAILURE:
            // TODO UI error message
            return _.assign({}, state, { isPosting: false });


        default:
            return state;
    }
};

export default search;
