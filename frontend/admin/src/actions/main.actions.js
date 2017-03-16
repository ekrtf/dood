import * as types from './action-types';
import http from '../utils/http';

// "user types in location input"
export function fetchFeedback(version) {
    return (dispatch) => {
        dispatch(fetchFeedbackRequest(version));
        return http.get(`/analytic/feedback/fetch/${version}`)
            .then(res => dispatch(fetchFeedbackSuccess(res, version)))
            .catch(e => dispatch(fetchFeedbackFailure(e)));
    };
}

function fetchFeedbackRequest(version) {
    return {
        type: types.FETCH_FEEDBACK_REQUEST,
        version
    };
}

function fetchFeedbackSuccess(feedback, version) {
    return {
        type: types.FETCH_FEEDBACK_SUCCESS,
        feedback,
        version
    };
}

function fetchFeedbackFailure(e) {
    return {
        type: types.FETCH_FEEDBACK_FAILURE,
        error: e
    };
}

// "select version"
export function setVersion(version) {
    return {
        type: types.SET_VERSION,
        version
    };
}

export function setUsername(user) {
    return {
        type: types.SET_USERNAME,
        user
    };
}

export function setPw(pw) {
    return {
        type: types.SET_PW,
        pw
    };
}

export function login() {
    return (dispatch, getState) => {
        const body = {
            user: getState().main.username,
            pw: getState().main.pw
        };

        dispatch(loginRequest());
        return http.post(`/admin/login`, body)
            .then(res => dispatch(loginSuccess(res)))
            .catch(e => dispatch(loginFailure(e)));
    };
}

function loginRequest() {
    return {
        type: types.LOGIN_REQUEST
    };
}

function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS
    };
}

function loginFailure() {
    return {
        type: types.LOGIN_FAILURE
    };
}

