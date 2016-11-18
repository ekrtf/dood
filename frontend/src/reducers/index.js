import { combineReducers } from 'redux';
import searchReducer from './search.reducer';
import resultsReducer from './results.reducer';

const reducer = combineReducers({
    search: searchReducer,
    results: resultsReducer
});

export default reducer;
