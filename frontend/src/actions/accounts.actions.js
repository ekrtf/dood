import * as types from './action-types';
import { getTransactions } from './transactions.actions';
import http from '../utils/http';

/**
 *
 * Toggle add form
 */

// "user clicks add account"
export function showAddForm() {
    return {
        type: types.SHOW_ADD,
        showAddForm: true
    };
}

// "user clicks cancel add account"
export function hideAddForm() {
    return {
        type: types.HIDE_ADD,
        showAddForm: false
    };
}

/**
 *
 * Toggle import
 */

// "user clicks import on account"
export function showImportForm() {
    return {
        type: types.SHOW_IMPORT,
        showImportForm: true
    };
}

// "user clicks hide import on account"
export function hideImportForm() {
    return {
        type: types.HIDE_IMPORT,
        showImportForm: false
    };
}

/**
 *
 * Account selector
 */

// "user selects item on account selector"
export function selectAccount(accountId) {
    return (dispatch) => {
        dispatch(setSelectedAccount(accountId));
        return dispatch(getTransactions(accountId));
    };
}

function setSelectedAccount(accountId) {
    return {
        type: types.SELECT_ACCOUNT,
        accountId
    };
}

/**
 *
 * GET accounts
 */

// "user selects account section in menu"
export function loadAccountsIfNeeded() {
    return (dispatch, getState) => {
        if (_.isEmpty(getState().accounts.accounts)) {
            return dispatch(loadAccounts());
        }
    };
}

// "state.accounts array is empty"
function loadAccounts() {
    return (dispatch) => {
        dispatch(requestAccouts());
        return http('GET', '/accounts')
            .then(accounts => dispatch(receiveAccounts(accounts)))
            .catch(e => dispatch(failedAccounts(e)));
    };
}

// "sent GET accounts request to server"
function requestAccouts() {
    return {
        type: types.GET_ACCOUNTS_REQUEST
    };
}

// "server responds successfully to accounts request"
function receiveAccounts(accounts) {
    return {
        type: types.GET_ACCOUNTS_SUCCESS,
        accounts
    };
}

// "server failed to request accounts"
function failedAccounts() {
    return {
        type: types.GET_ACCOUNTS_FAILURE
    };
}

/**
 *
 * POST account
 */

// "user submits add account form"
export function submitAccount(data) {
    return (dispatch) => {
        dispatch(postAccount());
        return http('POST', '/accounts', { newAccount: data })
            .then(newAccount => dispatch(receivedNewAccount(newAccount)))
            .catch(e => dispatch(failedNewAccount(e)));
    };
}

// "sent POST account request to server"
function postAccount() {
    return {
        type: types.POST_ACCOUNT_REQUEST
    };
}

// "server saved new account successfully"
function receivedNewAccount(newAccount) {
    return {
        type: types.POST_ACCOUNT_SUCCESS,
        newAccount
    };
}

// "server failed to save new account"
function failedNewAccount() {
    return {
        type: types.POST_ACCOUNT_FAILURE
    };
}
