import * as types from './action-types';
import http from '../utils/http';

// "user selects result item"
export function selectItem(itemId) {
    return (dispatch) => {
        dispatch(selectItemRequest(itemId));
        return http.get('/search/details/' + itemId)
            .then(response => dispatch(selectItemSuccess(response)))
            .catch(e => dispatch(selectItemFailure(e)));
    };
}

function selectItemRequest(itemId) {
    return {
        type: types.SELECT_ITEM_REQUEST,
        isFetching: true
    };
}

function selectItemSuccess(selectedItem) {
    return {
        type: types.SELECT_ITEM_SUCCESS,
        selectedItem
    };
}

function selectItemFailure(error) {
    return {
        type: types.SELECT_ITEM_FAILURE,
        error
    };
}
