import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { App, About, Smart, Search, Results, Product } from './containers';
import configureStore from './utils/configure-store';

import './index.scss';
import './index.html';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/about" />
                <Route path="/about" component={About} />
                <Route path="/clone">
                    <IndexRedirect to="/clone/search" />
                    <Route path="search" component={Search} />
                    <Route path="results" component={Results} />
                    <Route path="results/:resultId" component={Product} />
                </Route>
                <Route path="/ml" component={Smart} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
