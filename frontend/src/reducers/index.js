import { combineReducers } from 'redux';
import searchReducer from './search.reducer';

const reducer = combineReducers({
    search: searchReducer
});

export default reducer;
