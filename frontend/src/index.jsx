import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { App, About, Main } from './containers';
import configureStore from './utils/configure-store';

import './index.scss';
import './index.html';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Main} />
                <Route path="about" component={About} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
