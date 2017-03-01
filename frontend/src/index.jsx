import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router';
import { App, About, Home, Smart, Clone, Product, Feedback, Finish } from './containers';
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
                <Route path="/about" component={About} />
                <Route path="/ml" component={Smart} />
                <Route path="/results/:resultId" component={Product} />
                <Route path="/feedback" component={Feedback} />
                <Route path="/finish" component={Finish} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
