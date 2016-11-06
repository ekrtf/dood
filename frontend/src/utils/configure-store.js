import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'; // TODO dev only
import reducer from '../reducers';

const logger = createLogger();

function ConfigureStore() {
    return createStore(
        reducer,
        applyMiddleware(thunk, logger)
    );
}

export default ConfigureStore;
