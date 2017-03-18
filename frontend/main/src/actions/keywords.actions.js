import * as types from './action-types';
import { smartSearch } from './search.actions';
import http from '../utils/http';

// when smart loads: send user data to server
export function postUserDate(userKeywords) {
    return (dispatch, getState) => {
        dispatch(postUserDateRequest());
        return http.post('/context/keywords/date', { date: new Date() })
            .then(response => {
                dispatch(postUserDateSuccess(response))
                const location = getState().search.userLocation;
                if (getState().keywords.weatherWasCalled && location) {
                    dispatch(smartSearch(getState().keywords.words.toString(), location));
                }
            })
            .catch(e => dispatch(postUserDateFailure(e)));
    };
}

function postUserDateRequest() {
    return {
        type: types.POST_USER_DATE_REQUEST
    };
}

function postUserDateSuccess(dateKeywords) {
    return {
        type: types.POST_USER_DATE_SUCCESS,
        dateKeywords
    };
}

function postUserDateFailure(e) {
    return {
        type: types.POST_USER_DATE_FAILURE,
        error: e
    };
}

// once we have user location, get weather
export function getWeatherKeywords(location) {
    return (dispatch, getState) => {
        dispatch(getWeatherKeywordsRequest());
        return http.post(`/context/keywords/weather`, { location })
            .then(response => {
                dispatch(getWeatherKeywordsSuccess(response));
                const location = getState().search.userLocation;
                if (getState().keywords.dateWasCalled && location) {
                    dispatch(smartSearch(getState().keywords.words.toString(), location));
                }
            })
            .catch(e => dispatch(getWeatherKeywordsFailure(e)));
    };
}

function getWeatherKeywordsRequest() {
    return {
        type: types.GET_WEATHER_KEYWORDS_REQUEST
    };
}

function getWeatherKeywordsSuccess(weatherKeywords) {
    return {
        type: types.GET_WEATHER_KEYWORDS_SUCCESS,
        weatherKeywords
    };
}

function getWeatherKeywordsFailure(e) {
    return {
        type: types.GET_WEATHER_KEYWORDS_FAILURE,
        error: e
    };
}

// "user clicks on red cross to remove keyword"
export function removeKeyword(keywordId) {
    return {
        type: types.REMOVE_KEYWORD,
        keywordId
    };
}
