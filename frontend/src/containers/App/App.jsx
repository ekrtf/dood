import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, children } = this.props;

        return (
            <div className="main">
                <div className="main__header">
                    <HeaderBar />
                </div>
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

function mapDispatchToProps(dispatch) {
    return {
        changeVersion: () => {
            dispatch(changeVersion());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
