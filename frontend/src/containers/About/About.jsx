import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="about">
            <div className="about__content">
                <h1>Welcome to my experiment</h1>
                <p>
                    The aim is to compare the analytics of two websites.
                    Version 1 is a clone of a well kown travel advisor,
                    version 2 has been crafted with artificial intelligence interaction.
                </p>
                <p>
                    Which version you stumble upon is random. However you will be able
                    to try out the second version afer submitting your first choice.
                </p>
                <div className="about__rules">
                    <h4>Rules</h4>
                    <ol>
                        <li>Forget money. Suppose you have all you want.</li>
                        <li>Spend the time to find an option that really satisfy you.</li>
                        <li>You are encourage to suggest a better option</li>
                    </ol>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
