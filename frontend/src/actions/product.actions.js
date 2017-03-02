import * as types from './action-types';
import http from '../utils/http';

// "user clicks finish on feedback"
export function submitFeedback() {
    return (dispatch, getState) => {
        const state = getState();
        const feedback = {
            searchId: getState().search.searchId,
            rating: state.product.rating,
            comment: state.product.comment,
            email: state.product.email,
            version: state.results.version
        };
        dispatch(postFeedbackRequest(feedback));
        return http.post('/analytic/feedback', feedback)
            .then(response => dispatch(postFeedbackSuccess(response)))
            .catch(e => dispatch(postFeedbackFailure(e)));
    };
}

function postFeedbackRequest(feedback) {
    return {
        type: types.POST_FEEDBACK_REQUEST,
        feedback
    };
}

function postFeedbackSuccess() {
    return {
        type: types.POST_FEEDBACK_SUCCESS
    };
}

function postFeedbackFailure(error) {
    return {
        type: types.POST_FEEDBACK_FAILURE,
        error
    };
}

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

// "user chooses a venue"
export function setChosenProduct(product) {
    return (dispatch, getState) => {
        dispatch(postChosenProductRequest(product));
        const data = {
            resultId: product.resultId,
            searchId: getState().search.searchId
        };
        return http.post('/search/choice', data)
            .then(response => dispatch(postChosenProductSuccess(response)))
            .catch(e => dispatch(postChosenProductFailure(e)));
    };
}

function postChosenProductRequest(product) {
    return {
        type: types.SET_CHOSEN_PRODUCT_REQUEST,
        product
    };
}

function postChosenProductSuccess(res) {
    return {
        type: types.SET_CHOSEN_PRODUCT_SUCCESS,
        response: res
    };
}

function postChosenProductFailure(e) {
    return {
        type: types.SET_CHOSEN_PRODUCT_FAILURE,
        error: e
    };
}

// "user sets the feedback rating"
export function setRating(rating) {
    return {
        type: types.SET_RATING,
        rating
    };
}

// "user sets the feedback comment"
export function setComment(comment) {
    return {
        type: types.SET_COMMENT,
        comment
    };
}

// "user sets the feedback email"
export function setEmail(email) {
    return {
        type: types.SET_EMAIL,
        email
    };
}
