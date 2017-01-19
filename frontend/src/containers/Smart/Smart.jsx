import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Results } from '../.';
import { ResultItem } from '../../components';
import { smartSearch, userInputChange } from '../../actions/search.actions';

class Smart extends Component {
    constructor(props) {
        super(props);
        this._doSmartSearch = this._doSmartSearch.bind(this);
    }

    _doSmartSearch(e) {
        this.props.smartSearch(this.props.userInput);
    }

    _handleInputChange(e) {
        const input = e.target.value;
        this.props.userInputChange(input);
    }

    _renderResult(result, index) {
        const { doSelectItem } = this.props;
        return (
            <div key={index} className="results__item">
                <ResultItem index={index} result={result} onSelect={doSelectItem}/>
            </div>
        );
    }

    render() {
        const { userInput } = this.props;
        return (
            <div className="smart">
                <div className="smart__input">
                    <h2>What are you in the mood for?</h2>
                    <div className="smart__input__form">
                        <textarea className="smart__input__form__textarea"
                                  placeholder="e.g. Cheap restaurant for a dinner with friends"
                                  onChange={(e) => this._handleInputChange(e)}
                        ></textarea>
                        <button onClick={(e) => this._doSmartSearch(e)}
                                className="smart__input__form__button button big"
                        >
                            Be smart and save me scrolling time
                        </button>
                    </div>
                </div>

                <div className="smart__output">
                    <Results />
                </div>
            </div>
        );
    }
}

Smart.propTypes = {
    smartSearch: PropTypes.func.isRequired,
    userInput: PropTypes.string
};

function mapStateToProps(state) {
    return {
        results: state.results.results,
        userInput: state.search.userInput
    };
}

function mapDispatchToProps(dispatch) {
    return {
        smartSearch: (text) => {
            dispatch(smartSearch(text));
        },
        userInputChange: (input) => {
            dispatch(userInputChange(input));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
