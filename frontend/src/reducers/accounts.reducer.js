import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    showAddForm: false,
    showImportForm: false,
    isFetching: false,
    isPosting: false,
    selectedAccount: 'all',
    accounts: []
};

const accounts = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.POST_TRXFILE_SUCCESS:
            return _.assign({}, state, { showImportForm: false });

        case types.SHOW_ADD:
            return _.assign({}, state, { showAddForm: true });

        case types.HIDE_ADD:
            return _.assign({}, state, { showAddForm: false });

        case types.SHOW_IMPORT:
            return _.assign({}, state, { showImportForm: true });

        case types.HIDE_IMPORT:
            return _.assign({}, state, { showImportForm: false });


        case types.SELECT_ACCOUNT:
            return _.assign({}, state, { selectedAccount: action.accountId });


        case types.GET_ACCOUNTS_REQUEST:
            return _.assign({}, state, { isFetching: true });

        case types.GET_ACCOUNTS_SUCCESS:
            return _.assign({}, state, {
                isFetching: false,
                accounts: _.map(action.accounts, (account) => account)
            });

        case types.GET_ACCOUNTS_FAILURE:
            // TODO UI error message
            return _.assign({}, state, { isFetching: false });


        case types.POST_ACCOUNT_REQUEST:
            return _.assign({}, state, { isPosting: true });

        case types.POST_ACCOUNT_SUCCESS:
            return _.assign({}, state, {
                showAddForm: false,
                isPosting: false,
                accounts: _.concat(state.accounts, action.newAccount)
            });

        case types.POST_ACCOUNT_FAILURE:
            // TODO UI error message
            return _.assign({}, state, { isPosting: false });


        default:
            return state;
    }
};

export default accounts;
