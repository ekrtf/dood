import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router';
import { App, About, Home, Smart, Clone, Product, Feedback } from './containers';
import configureStore from './utils/configure-store';

import './index.scss';
import './index.html';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/clone" component={Clone} />
                <Route path="/results/:resultId" component={Product} />
                <Route path="/ml" component={Smart} />
                <Route path="/feedback" component={Feedback} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
