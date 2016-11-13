import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components';

class App extends Component {
    render() {
        const { location, children } = this.props;

        return (
            <div className="main">
                <HeaderBar />
                <div className="main__content">
                    {children}
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
