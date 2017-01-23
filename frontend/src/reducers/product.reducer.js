import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    showImages: false,
    currentImage: 0,
    chosenProduct: null
};

const product = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

        case types.SET_CHOSEN_PRODUCT:
            return _.assign({}, state, {
                chosenProduct: action.product
            });

        case types.TOGGLE_IMAGES:
            return _.assign({}, state, {
                showImages: !state.showImages
            });

        case types.SELECT_IMAGE:
            return _.assign({}, state, {
                currentImage: action.imageIndex
            });

        default:
            return state;
    }
};

export default product;
