import { assign, concat, cloneDeep, uniq } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    words: [],
    weatherWasCalled: false,
    dateWasCalled: false
};

const product = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.GET_WEATHER_KEYWORDS_SUCCESS:
            return assign({}, state, {
                weatherWasCalled: true,
                words: uniq(concat(state.words, action.weatherKeywords))
            });

        case types.POST_USER_DATE_SUCCESS:
            return assign({}, state, {
                dateWasCalled: true,
                words: uniq(concat(state.words, action.dateKeywords))
            });

        case types.SMART_SEARCH_SUCCESS:
            return assign({}, state, {
                words: uniq(concat(state.words, action.keywords))
            });

        case types.REMOVE_KEYWORD:
            // HACK: using array index instead of id
            const newWords = _.cloneDeep(state.words);
            newWords.splice(action.keywordId, 1);
            return assign({}, state, {
                words: newWords
            });

        default:
            return state;
    }
};

export default product;
