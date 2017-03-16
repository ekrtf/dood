import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { HeaderBar, Footer } from '../../components';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, children, screen } = this.props;

        return (
            <div className="main" id="main-container">
                <div className="main__header">
                    <HeaderBar />
                </div>
                <div className="main__content">
                    {children}
                </div>
                <footer className="main__footer">
                    <Footer screen={screen} />
                </footer>
            </div>
        );
    }

}

App.propTypes = {
    screen: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        screen: state.screen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeVersion: () => {
            dispatch(changeVersion());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
