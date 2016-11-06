import * as types from './action-types';
import moment from 'moment';
import http from '../utils/http';

// on dashboard load
export function loadAccountsSummary() {
    return (dispatch, getState) => {
        const selectedCurrency = getState().dashboard.currency;
        dispatch(getAccountsSum());
        return http('GET', '/dashboard/accounts/' + selectedCurrency)
            .then(response => dispatch(getAccountsSumSuccess(response)))
            .catch(e => dispatch(getAccountsSumFail(e)));
    };
}

function getAccountsSum() {
    return {
        type: types.GET_ACCOUNTS_SUMMARY_REQUEST
    };
}

function getAccountsSumSuccess(summary) {
    return {
        type: types.GET_ACCOUNTS_SUMMARY_SUCCESS,
        summary
    };
}

function getAccountsSumFail(error) {
    return {
        type: types.GET_ACCOUNTS_SUMMARY_FAILURE,
        error
    };
}


// "user selects a currency"
export function selectCurrency(currency) {
    return (dispatch) => {
        dispatch(setSelectedCurrency(currency));
        dispatch(getLatestKpis());
        return dispatch(loadAccountsSummary());
    };
}

function setSelectedCurrency(currency) {
    return {
        type: types.SELECT_CURRENCY,
        currency
    };
}

// "user selects dashboard"
export function getLatestKpis() {
    return (dispatch, getState) => {
        const selectedCurrency = getState().dashboard.currency;
        dispatch(getKpis());
        return http('GET', '/dashboard/kpis/' + selectedCurrency)
            .then(response => dispatch(getKpisSuccess(response)))
            .catch(e => dispatch(getKpiFail(e)));
    };
}

function getKpis() {
    return {
        type: types.GET_KPIS_REQUEST
    };
}

function getKpisSuccess(kpis) {
    return {
        type: types.GET_KPIS_SUCCESS,
        kpis: kpis
    };
}

function getKpiFail(error) {
    return {
        type: types.GET_KPIS_FAILURE,
        error
    };
}


// on dashboard load
export function getLastImportDate() {
    return (dispatch) => {
        dispatch(getTimestamp());
        return http('GET', '/transactions/latest')
            .then(response => {
                let timestamp = moment(response[0]['max("createdAt")']).format('dddd Do MMMM, YYYY');
                dispatch(getTimestampSuccess(timestamp));
            })
            .catch(e => dispatch(getTimestampFail(e)));
    };
}

function getTimestamp() {
    return {
        type: types.GET_TIMESTAMP_REQUEST
    };
}

function getTimestampSuccess(timestamp) {
    return {
        type: types.GET_TIMESTAMP_SUCCESS,
        timestamp
    };
}

function getTimestampFail(error) {
    return {
        type: types.GET_TIMESTAMP_FAILURE,
        error
    };
}
