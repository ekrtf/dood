import { assign, isEmpty, get } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    version: 'smart',
    username: null,
    pw: null,
    isFetching: false,
    isLoggedIn: false,

    feedback: null,
    averageRating: null,
    numberOfSearches: null,
    numberOfSearchesWithChoice: null
};

const main = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SET_USERNAME:
            return assign({}, state, {
                username: action.user
            });

        case types.SET_PW:
            return assign({}, state, {
                pw: action.pw
            });

    	case types.SET_VERSION:
    		return assign({}, state, {
    			version: action.version,
                feedback: null,
                averageRating: null,
                numberOfSearches: null,
                numberOfSearchesWithChoice: null
    		});

    	case types.FETCH_FEEDBACK_REQUEST:
    		return assign({}, state, {
    			isFetching: action.isFetching
    		});

    	case types.FETCH_FEEDBACK_SUCCESS:
    		return assign({}, state, {
    			feedback: action.feedback.feedback,
                averageRating: action.feedback.averageRating[0]['avg("rating")'],
                numberOfSearches: action.feedback.numberOfSearches,
                numberOfSearchesWithChoice: action.feedback.numberOfSearchesWithChoice
    		});

        case types.LOGIN_SUCCESS:
            return assign({}, state, {
                isLoggedIn: true
            });

        default:
            return state;
    }
};

export default main;
