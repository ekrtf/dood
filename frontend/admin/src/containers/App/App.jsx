import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeaderBar, Footer } from '../../components';
import {
    setVersion,
    fetchFeedback,
    setUsername,
    setPw,
    login
} from '../../actions/main.actions';

class App extends Component {
    constructor(props) {
        super(props);
        this._usernameChange = this._usernameChange.bind(this);
        this._pwChange = this._pwChange.bind(this);
        this._login = this._login.bind(this);
    }

    _usernameChange(e) {
        this.props.setUsername(e.target.value);
    }

     _pwChange(e) {
        this.props.setPw(e.target.value);
    }

    _login() {
        this.props.login();
    }

    render() {
        const { isLoggedIn, fetchFeedback, location, children, screen, setVersion, version } = this.props;

        if (isLoggedIn === true) {
            return (
                <div className="main" id="main-container">
                    <div className="main__header">
                        <HeaderBar version={version} setVersion={setVersion} fetchFeedback={fetchFeedback} />
                    </div>
                    <div className="main__content">
                        {children}
                    </div>
                    <footer className="main__footer">
                        <Footer screen={screen} />
                    </footer>
                </div>
            );
        } else {
            return (
                <div className="main" id="main-container">
                    <input type="text" onChange={(e) => this._usernameChange(e)}/>
                    <input type="text" onChange={(e) => this._pwChange(e)}/>
                    <button onClick={(e) => this._login(e)}>Login</button>
                </div>
            );
        }
    }
}

App.propTypes = {
};

function mapStateToProps(state) {
    return {
        version: state.main.version,
        isLoggedIn: state.main.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setVersion: (version) => {
            dispatch(setVersion(version));
        },
        fetchFeedback: (version) => {
            dispatch(fetchFeedback(version))
        },
        setUsername: (user) => {
            dispatch(setUsername(user));
        },
        setPw: (pw) => {
            dispatch(setPw(pw));
        },
        login: () => {
            dispatch(login())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
