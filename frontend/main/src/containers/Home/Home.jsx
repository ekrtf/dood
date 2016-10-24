import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Home extends Component {
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
            <div className="container home">
                <div className="row home__content">
                    <div className="col col-md-12">
                        <section className="home__content__section--title">
                            <h1>Could your experience with online city guides be smarter?</h1>
                            {`This experiment is designed to find out.`}
                        </section>
                    </div>
                    <div className="col col-md-12">
                        <h4 className="home__content__heading">What you need to do</h4>
                        <table className="table-condensed">
                            <tbody>
                                <tr>
                                    <td className="home__content__table__num">Scenario:</td>
                                    <td className="home__content__table__rule">{`You're looking for a new place to visit in your city`}</td>
                                </tr>
                                <tr>
                                    <td className="home__content__table__num">1.</td>
                                    <td className="home__content__table__rule">Click "Get Started" below</td>
                                </tr>
                                <tr>
                                    <td className="home__content__table__num">2.</td>
                                    <td className="home__content__table__rule">Choose a place to visit (restaurant, museum, bar, theatre, monument… anything you want)</td>
                                </tr>
                                <tr>
                                    <td className="home__content__table__num">3.</td>
                                    <td className="home__content__table__rule">Rate your experience</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="home__start">
                    <button onClick={(e) => this._handleGetStarted(e)}>
                        Get Started
                        <i className="em em-rocket"></i>
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
