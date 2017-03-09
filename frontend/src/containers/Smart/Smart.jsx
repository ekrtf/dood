import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import { Results } from '../.';
import { ResultItem } from '../../components';
import { setVersion } from '../../actions/results.actions';
import { isEmpty } from 'lodash';
import {
    smartSearch,
    userInputChange,
    getUserLocation,
    toggleLocationForm,
    smartLocationChange
} from '../../actions/search.actions';

class Smart extends Component {
    constructor(props) {
        super(props);
        this._doSmartSearch = this._doSmartSearch.bind(this);
        this._handleToggleLocation = this._handleToggleLocation.bind(this);
        this._handleLocationChange = this._handleLocationChange.bind(this);
        this._getButtonClass = this._getButtonClass.bind(this);
    }

    componentDidMount() {
        this.props.setVersion('ml');
        this.getUserLocation();
    }

    getUserLocation() {
        if (!navigator.geolocation) {
            // TODO: display input for user
        }

        navigator.geolocation.getCurrentPosition((position) => {
            this.props.getUserLocation({
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
    }

    _handleToggleLocation(e) {
        this.props.toggleLocationForm();
    }

    _handleLocationChange(e) {
        this.props.smartLocationChange(e.target.value);
    }

    _doSmartSearch(e) {
        this.props.smartSearch(this.props.userInput, this.props.userLocation);
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

    _getButtonClass() {
        if (!this.props.userInput || !this.props.userLocation) {
            return 'smart__input__form__button--disabled';
        }
        return 'smart__input__form__button';
    }

    render() {
        const { userInput, areResultsEmpty, userLocation, showLocationForm, toggleLocationForm } = this.props;
        return (
            <div className="container smart">
                <div className="smart__input">
                    <h4 className="smart__input__header">What are you in the mood for?</h4>
                    <div className="smart__input__form">
                        <input className="smart__input__form__textarea"
                                  placeholder="e.g. Cheap restaurant for a dinner with friends"
                                  onChange={(e) => this._handleInputChange(e)}
                        ></input>
                        <div className="smart__input__form__location">
                            <div>Searching location:</div>
                            <div className="smart__input__form__location__spin">
                                { !userLocation && <Spinner />}
                            </div>
                            <div className="smart__input__form__location__loc">
                                { userLocation && userLocation }
                            </div>
                            <div className="smart__input__form__location__change" onClick={(e) => this._handleToggleLocation(e)}>
                                (Change location)
                            </div>
                        </div>
                        <div className="smart__input__form__change">
                            { showLocationForm &&
                                <input type="text" placeholder="Enter location" onBlur={(e) => toggleLocationForm()} onChange={(e) => this._handleLocationChange(e)}/>
                            }
                        </div>
                        <button onClick={(e) => this._doSmartSearch(e)}
                                className={this._getButtonClass()}
                        >
                            Save me some scrolling time
                            <i className="em em-confetti_ball"></i>
                        </button>
                    </div>
                </div>

                <div className="smart__suggestions">
                    {areResultsEmpty &&
                        <h4 className="smart__output__title">Not sure? Here are some suggestions</h4>
                    }
                </div>

                <div className="smart__output">
                    {!areResultsEmpty &&
                        <h4 className="smart__output__title">Here are the top results, tailored for you</h4>
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
    userLocation: PropTypes.string,
    userInput: PropTypes.string,
    showLocationForm: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        areResultsEmpty: isEmpty(state.results.results),
        userInput: state.search.userInput,
        userLocation: state.search.userLocation,
        showLocationForm: state.search.showLocationForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        smartSearch: () => {
            dispatch(smartSearch());
        },
        userInputChange: (input) => {
            dispatch(userInputChange(input));
        },
        getUserLocation: (location) => {
            dispatch(getUserLocation(location));
        },
        setVersion: (version) => {
            dispatch(setVersion(version));
        },
        toggleLocationForm: () => {
            dispatch(toggleLocationForm())
        },
        smartLocationChange: (location) => {
            dispatch(smartLocationChange(location))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
