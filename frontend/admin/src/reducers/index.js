import { combineReducers } from 'redux';
import mainReducer from './main.reducer';

const reducer = combineReducers({
    main: mainReducer
});

export default reducer;
