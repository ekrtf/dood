import * as types from './action-types';
import http from '../utils/http';

// smart version loads: fetch keywords
export function fetchKeywords() {
    // TODO
    // return (dispatch, getState) => {
    //     dispatch(postChosenProductRequest(product));
    //     const data = {
    //         resultId: product.resultId,
    //         searchId: getState().search.searchId
    //     };
    //     return http.post('/search/choice', data)
    //         .then(response => dispatch(postChosenProductSuccess(response)))
    //         .catch(e => dispatch(postChosenProductFailure(e)));
    // };
}

// "user clicks on red cross to remove keyword"
export function removeKeyword(keywordId) {
    return {
        type: types.REMOVE_KEYWORD,
        keywordId
    };
}
