import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
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
            <div className="about">
                <div className="about__content">
                    <div className="about__content__greet">
                        <h1>Welcome to my dissertation experiment</h1>
                    </div>
                    <h4>TL;DR: please take part in the experiment</h4>
                    <section>
                        <h3>What is the dissertation about?</h3>
                        <p>
                            Trying to find out if there is significant business value in enhancing
                            your user experience on travel websites (think Yelp) with machine learning
                            techniques.
                        </p>
                        <p>
                            Online businesses use it widely today to serve you ads for the product you just
                            bought and collect large amount of information about you.
                        </p>
                        <p>
                            Would they be better off using this information to help you?
                        </p>
                    </section>
                    <section>
                        <h3>Why this experiment?</h3>
                        <p>
                            To answer the question I need to collect as much data as possible about user
                            satisfaction after experiencing a travel site.
                        </p>
                    </section>
                    <div className="about__rules">
                        <h4>Rules</h4>
                        <ol>
                            <li>Spend the time to find an option when you would actually go</li>
                            <li>Do click "Nothing's good enough" if what is how you feel</li>
                            <li>Take the experiment only once, dear user</li>
                        </ol>
                    </div>
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
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
