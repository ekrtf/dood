import { assign, merge } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    words: [
        'evening',
        'hello',
        'restaurant',
        'my ass'
    ]
};

const product = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SMART_SEARCH_SUCCESS:
            return assign({}, state, {
                words: action.keywords
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
