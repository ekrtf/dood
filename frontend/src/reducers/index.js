import { combineReducers } from 'redux';
import dashboardReducer from './dashboard.reducer';
import accountsReducer from './accounts.reducer';
import transactionsReducer from './transactions.reducer';

const reducer = combineReducers({
    dashboard: dashboardReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer
});

export default reducer;
