import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    latest: 'NA',
    currency: 'usd',
    isSummaryLoading: false,
    summary: [],
    isKpiLoading: false,
    kpis: []
};

const dashboard = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {
        case types.SELECT_CURRENCY:
            return _.assign({}, state, { currency: action.currency });


        case types.GET_ACCOUNTS_SUMMARY_REQUEST:
            return _.assign({}, state, { isSummaryLoading: true });

        case types.GET_ACCOUNTS_SUMMARY_SUCCESS:
            return _.assign({}, state, {
                isSummaryLoading: false,
                summary: action.summary
            });

        case types.GET_ACCOUNTS_SUMMARY_FAILURE:
            return _.assign({}, state, { isSummaryLoading: false });


        case types.GET_KPIS_REQUEST:
            return _.assign({}, state, { isKpiLoading: true });

        case types.GET_KPIS_SUCCESS:
            return _.assign({}, state, { isKpiLoading: false, kpis: action.kpis });

        case types.GET_KPIS_FAILURE:
            return _.assign({}, state, { isKpiLoading: false });


        case types.GET_TIMESTAMP_REQUEST:
            return state;

        case types.GET_TIMESTAMP_SUCCESS:
            return _.assign({}, state, { latest: action.timestamp });

        case types.GET_TIMESTAMP_FAILURE:
            return _.assign({}, state, { latest: 'NA' });

        default:
            return state;
    }
};

export default dashboard;
