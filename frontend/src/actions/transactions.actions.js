import * as types from './action-types';
import http from '../utils/http';

// "user selects an account"
export function getTransactions(accountId) {
    return (dispatch) => {
        dispatch(getTrx());
        return http('GET', '/transactions/' + accountId)
            .then(transactions => dispatch(getTrxSuccess(transactions)))
            .catch(e => dispatch(getTrxFail(e)));
    };
}

function getTrx() {
    return {
        type: types.GET_ACCOUNT_TRX_REQUEST
    };
}

function getTrxSuccess(transactions) {
    return {
        type: types.GET_ACCOUNT_TRX_SUCCESS,
        transactions
    };
}

function getTrxFail(error) {
    return {
        type: types.GET_ACCOUNT_TRX_FAILURE,
        error
    };
}


// "user drops a file in the import section"
export function uploadTrxFile(files, accountId) {
    return (dispatch, getState) => {
        dispatch(postTrxFile());

        let formData = new FormData();
        _.forEach(files, (file, index) => formData.append('file' + index, file));

        return http('POST', '/transactions/' + accountId, formData, 'files')
            .then(transactions => {
                dispatch(postTrxSuccess());

                let selectedAccount = getState().accounts.selectedAccount;
                if (accountId === selectedAccount) {
                    dispatch(getTransactions(accountId));
                }
            })
            .catch(e => dispatch(postTrxFail(e)));
    };
}

function postTrxFile() {
    return {
        type: types.POST_TRXFILE_REQUEST
    };
}

function postTrxSuccess() {
    return {
        type: types.POST_TRXFILE_SUCCESS
    };
}

function postTrxFail(error) {
    return {
        type: types.POST_TRXFILE_FAILURE,
        error
    };
}
