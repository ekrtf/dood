import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    destination: '',
    term: '',
    userInput: null,
    isPosting: false,
    userLocation: null
};

const search = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.USER_LOCATION_SUCCESS:
            return _.assign({}, state, {
                userLocation: action.userLocation
            });


        case types.USER_INPUT_CHANGE:
            return _.assign({}, state, {
                userInput: action.userInput
            });


        case types.POST_SEARCH_REQUEST:
            return _.assign({}, state, {
                isPosting: true,
                destination: action.destination,
                term: action.term
            });

        case types.POST_SEARCH_SUCCESS:
            return _.assign({}, state, {
                isPosting: false
            });

        case types.POST_SEARCH_FAILURE:
            // TODO UI error message
            return _.assign({}, state, { isPosting: false });


        case types.SMART_SEARCH_REQUEST:
            return _.assign({}, state, {
                isPosting: true
            });

        case types.SMART_SEARCH_SUCCESS:
            return _.assign({}, state, {
                isPosting: false
            });

        case types.SMART_SEARCH_FAILURE:
            // TODO UI error message
            return _.assign({}, state, { isPosting: false });


        default:
            return state;
    }
};

export default search;
