import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { SideBar } from '../../components';

const menuItems = [
    {
        id: 1,
        label: 'dashboard',
        route: '/'
    },
    {
        id: 2,
        label: 'accounts',
        route: '/accounts'
    },
    {
        id: 3,
        label: 'budgets',
        route: '/budget'
    }
];

class App extends Component {
    render() {
        const { location, children } = this.props;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className="main">
                    <SideBar menuItems={menuItems} currentPath={location.pathname} />
                    <div className="main__content">
                        {children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
