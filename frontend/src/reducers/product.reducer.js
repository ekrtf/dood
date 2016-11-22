import _ from 'lodash';
import * as types from '../actions/action-types';

const initialState = {
    showImages: false,
    currentImage: 0
};

const product = function(state, action) {
    if (!state) {
        state = initialState;
    }

    switch(action.type) {

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
