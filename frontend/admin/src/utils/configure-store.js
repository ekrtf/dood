import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'; // TODO dev only
import reducer from '../reducers';

// log redux actions in developement only
const middleware = __ENV__ === 'dev' ?
    applyMiddleware(thunk, createLogger()) :
    applyMiddleware(thunk);

function ConfigureStore() {
    return createStore(
        reducer,
        compose(
            middleware
        )
    );
}

export default ConfigureStore;
