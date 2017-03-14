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
                            {`That's the question this dissertation tries to answer.`}
                        </section>
                    </div>
                    <div className="col col-md-6">
                        <section className="home__content__section">
                            <h4 className="home__content__heading">What is this disseration about?</h4>
                            <p>
                                {`Services we use online know a lot about us. Combined with today's technology, it enables
                                businesses to predict our consumption behaviours an target advertising accordingly. That is
                                a very lucrative practice, so much that by itself, it keeps some businesses alive (Facebook for example).`}
                            </p>
                            <p>
                                {`I think businesses could create even more value if customer data and prediction technology were used primarily to
                                enhance our own experience with their services. This experiment is designed to verify that hypothesis.`}
                            </p>
                            <p className="home__content__section--important">
                                {`DISCLAIMER: this is a dissertation experiment, not an enterprise product. There will be bugs, there will be failures.
                                If you're nice you can report bugs using the link in the footer. In any case, I apologies for any frustration this app
                                may cause.`}
                            </p>
                        </section>
                    </div>
                    <div className="col col-md-6">
                        <section className="home__content__section">
                            <h4 className="home__content__heading">Why this experiment?</h4>
                            <p>
                                {`To answer this question I need to collect data from real world users in
                                a real world situation. Therefore I built two online city guides: one is a clone of Yelp,
                                the other uses sources accross the internet and is peppered with intelligent, context-aware personalisation.
                                Depending on how technical you are, you may call this an A/B test.`}
                            </p>
                            <p>
                                {`Measuring the performance of both versions will enable
                                me to compare them to assess my proposed solution
                                and ultimately publish recommendations for online city guides.`}
                            </p>
                        </section>
                        <section className="home__content__section--important">
                            <h4 className="home__content__heading">What you need to do</h4>
                            <table className="table">
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
                                        <td className="home__content__table__rule">Choose a place to visit in a city (restaurant, museum, bar, theatre, monument… anything you want)</td>
                                    </tr>
                                    <tr>
                                        <td className="home__content__table__num">3.</td>
                                        <td className="home__content__table__rule">Rate your experience</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>

                <div className="home__tldr">
                    <h4>TL;DR: Please take part in the experiement</h4>
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
