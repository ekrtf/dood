import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { App, Search, Landing } from './containers';
import configureStore from './utils/configure-store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import './index.scss';
import './index.html';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Landing} />
                <Route path="search" component={Search} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
