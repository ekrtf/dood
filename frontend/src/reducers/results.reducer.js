import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    slectedItem: {},
    isFetching: false
};

const results = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

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
