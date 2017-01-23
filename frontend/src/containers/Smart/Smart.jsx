import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Results } from '../.';
import { ResultItem } from '../../components';
import { smartSearch, userInputChange, setUserLocation } from '../../actions/search.actions';

class Smart extends Component {
    constructor(props) {
        super(props);
        this._doSmartSearch = this._doSmartSearch.bind(this);
    }

    componentDidMount() {
        this.getUserLocation();
    }

    getUserLocation() {
        if (!navigator.geolocation) {
            // TODO: display input for user
        }

        navigator.geolocation.getCurrentPosition((position) => {
            this.props.setUserLocation({
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
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
        const { userInput, areResultsEmpty } = this.props;
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
                            Be smart and save me some scrolling time
                        </button>
                    </div>
                </div>

                <div className="smart__output">
                    {!areResultsEmpty &&
                        <h2 className="smart__output__title">Here are the top 5 results just for you:</h2>
                    }
                    <Results />
                </div>
            </div>
        );
    }
}

Smart.propTypes = {
    smartSearch: PropTypes.func.isRequired,
    areResultsEmpty: PropTypes.bool.isRequired,
    userInput: PropTypes.string
};

function mapStateToProps(state) {
    return {
        areResultsEmpty: state.results.results.length === 0,
        userInput: state.search.userInput,
        userLocation: state.search.userLocation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        smartSearch: (text) => {
            dispatch(smartSearch(text));
        },
        userInputChange: (input) => {
            dispatch(userInputChange(input));
        },
        setUserLocation: (location) => {
            dispatch(setUserLocation(location));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
