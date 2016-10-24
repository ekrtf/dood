import { assign } from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    showImages: false,
    currentImage: 0,
    chosenProduct: null,
    rating: null,
    comment: null,
    email: null,
    isSubmitted: false,
    disableFinish: true
};

const product = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.POST_FEEDBACK_SUCCESS:
            return assign({}, state, {
                isSubmitted: true
            });

        case types.SET_COMMENT:
            return assign({}, state, {
                comment: action.comment
            });

        case types.SET_EMAIL:
            return assign({}, state, {
                email: action.email
            });

        case types.SET_RATING:
            return assign({}, state, {
                rating: action.rating,
                disableFinish: false
            });

        case types.SET_CHOSEN_PRODUCT_REQUEST:
            return assign({}, state, {
                chosenProduct: action.product
            });

        case types.TOGGLE_IMAGES:
            return assign({}, state, {
                showImages: !state.showImages
            });

        case types.SELECT_IMAGE:
            return assign({}, state, {
                currentImage: action.imageIndex
            });

        default:
            return state;
    }
};

export default product;
