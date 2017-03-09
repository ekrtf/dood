import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class About extends Component {
    constructor(props) {
        super(props);
        this._handleGetStarted = this._handleGetStarted.bind(this);
    }

    _handleGetStarted(e) {
        const randomHash = {
            0: '/clone',
            1: '/smart'
        };

        // randomly route the user to either version
        browserHistory.push(randomHash[Math.floor(Math.random() * 2)]);
    }

    render() {
        return (
            <div className="about">
                <div className="about__content">
                    This is a dissertation. Please take part in the experiment.
                </div>
                <div className="about__start">
                    <button onClick={(e) => this._handleGetStarted(e)}
                            className="button special big"
                    >Get Started</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
