import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components';
import { changeVersion } from '../../actions/results.actions';

class App extends Component {
    constructor(props) {
        super(props);
        this._handleChangeVersion = this._handleChangeVersion.bind(this);
    }

    _handleChangeVersion(e) {
        this.props.changeVersion();
    }

    render() {
        const { location, children } = this.props;

        return (
            <div className="main">
                <div className="main__header">
                    <HeaderBar handleChangeVersion={this._handleChangeVersion}/>
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
