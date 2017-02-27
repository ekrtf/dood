import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this._handleGetStarted = this._handleGetStarted.bind(this);
    }

    _handleGetStarted(e) {
        const randomHash = {
            0: '/clone',
            1: '/ml'
        };

        // randomly route the user to either version
        this.props.history.push(randomHash[Math.floor(Math.random() * 2)]);
    }

    render() {
        return (
            <div className="container home">
                <div className="row home__content">
                    <div className="col col-md-6">
                        <section className="home__content__section">
                            <h4 className="home__content__heading">What is this disseration about?</h4>
                            <p>
                                Trying to find out if there is significant business value in enhancing your user 
                                experience on travel websites (think Yelp) with machine learning techniques.
                                Online businesses use it widely today to serve you ads for the product you just 
                                bought and collect large amount of information about you.
                            </p>
                            <p className="home__content__section">
                                Trying to find out if there is significant business value in enhancing your user 
                                experience on travel websites (think Yelp) with machine learning techniques.
                                Online businesses use it widely today to serve you ads for the product you just 
                                bought and collect large amount of information about you.
                            </p>
                        </section>
                    </div>
                    <div className="col col-md-6">
                        <section className="home__content__section">
                            <h4 className="home__content__heading">Why this experiment?</h4>
                            <p>
                                To answer this question I need to collect data from real world users in 
                                a real world situation. Measuring the performance of my proposed solution
                                allows to draw conclusions about the relevance of such system.
                            </p>
                        </section>
                        <section className="home__content__section">
                            <h4 className="home__content__heading">Rules</h4>
                            <ol>
                                <li>Spend the time to find an option when you would actually go</li>
                                <li>Do click "Nothing's good enough" if what is how you feel</li>
                                <li>Take the experiment only once, dear user</li>
                            </ol>
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
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
