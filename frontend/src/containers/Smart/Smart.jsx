import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Results } from '../.';
import { ResultItem } from '../../components';
import { smartSearch } from '../../actions/search.actions';

class Smart extends Component {
    constructor(props) {
        super(props);
        this._doSmartSearch = this._doSmartSearch.bind(this);
    }

    _doSmartSearch(text) {
        this.props.smartSearch(text)
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
        let val = 'cheap place for two with romantic music';
        return (
            <div className="smart">
                <div className="smart__input">
                    <h2>What are you in the mood for?</h2>
                    <div className="smart__input__form">
                        <textarea className="smart__input__form__textarea" placeholder="e.g. Cheap restaurant for a dinner with friends" value={val}></textarea>
                        <button onClick={() => this._doSmartSearch(val)} className="smart__input__form__button button big">Be smart and save me scrolling time</button>
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
};

function mapStateToProps(state) {
    return {
        results: state.results.results
    };
}

function mapDispatchToProps(dispatch) {
    return {
        smartSearch: (text) => {
            dispatch(smartSearch(text));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
