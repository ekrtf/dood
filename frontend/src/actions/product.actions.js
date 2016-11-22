import * as types from './action-types';
import http from '../utils/http';

// "user opens/closes image gallery"
export function toggleImages() {
    return { type: types.TOGGLE_IMAGES };
}

// "user selects an image"
export function selectImage(imageIndex) {
    return {
        type: types.SELECT_IMAGE,
        imageIndex
    };
}
