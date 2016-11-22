import { combineReducers } from 'redux';
import searchReducer from './search.reducer';
import resultsReducer from './results.reducer';
import productReducer from './product.reducer';

const reducer = combineReducers({
    search: searchReducer,
    results: resultsReducer,
    product: productReducer
});

export default reducer;
