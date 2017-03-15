import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import searchReducer from './search.reducer';
import resultsReducer from './results.reducer';
import productReducer from './product.reducer';
import keywordsReducer from './keywords.reducer';

const reducer = combineReducers({
    search: searchReducer,
    results: resultsReducer,
    product: productReducer,
    keywords: keywordsReducer,
    screen: createResponsiveStateReducer({
        extraSmall: 512,
        small: 768,
        medium: 992,
        large: 1200
    })
});

export default reducer;
