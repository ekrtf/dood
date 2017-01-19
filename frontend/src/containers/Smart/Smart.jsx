import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Product, Results, Search } from '../.';

class Smart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="smart">
                <div className="smart__input">
                    <h2>What are you in the mood for?</h2>
                    <div className="smart__input__form">
                        <textarea className="smart__input__form__textarea" placeholder="e.g. Cheap restaurant for a dinner with friends"></textarea>
                        <button className="smart__input__form__button button big">Be smart and save me scrolling time</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
