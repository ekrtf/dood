import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { App, Dashboard, Accounts, Budget } from './containers';
import configureStore from './utils/configure-store';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();
import './index.scss';
import './index.html';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={Dashboard} />
                <Route path="accounts" component={Accounts} />
                <Route path="budget" component={Budget} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
