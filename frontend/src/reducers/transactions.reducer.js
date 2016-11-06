import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    latest: 'NA',
    isPosting: false,
    isFetching: false,
    transactions: []
};

const transactions = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.GET_ACCOUNT_TRX_REQUEST:
            return _.assign({}, state, { isFetching: true });

        case types.GET_ACCOUNT_TRX_SUCCESS:
            return _.assign({}, state, {
                isFetching: false,
                transactions: action.transactions
            });

        case types.GET_ACCOUNT_TRX_FAILURE:
            // TODO error message
            return _.assign({}, state, { isFetching: false });


        case types.POST_TRXFILE_REQUEST:
            return _.assign({}, state, { isPosting: true });

        case types.POST_TRXFILE_SUCCESS:
            return _.assign({}, state, { isPosting: false });

        case types.POST_TRXFILE_FAILURE:
            // TODO error message
            return _.assign({}, state, { isPosting: false });

        default:
            return state;

    }
};

export default transactions;
