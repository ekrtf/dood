import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import { Results } from '../.';
import { ResultItem, LocationInput } from '../../components';
import { setVersion } from '../../actions/results.actions';
import { isEmpty } from 'lodash';
import {
    smartSearch,
    userInputChange,
    getUserLocation,
    toggleLocationForm,
    locationChange,
    setUserLocation
} from '../../actions/search.actions';

class Smart extends Component {
    constructor(props) {
        super(props);
        this._doSmartSearch = this._doSmartSearch.bind(this);
        this._toggleLocationForm = this._toggleLocationForm.bind(this);
        this._handleLocationChange = this._handleLocationChange.bind(this);
        this._getButtonClass = this._getButtonClass.bind(this);
        this._getLocationClass = this._getLocationClass.bind(this);
        this._selectLocation = this._selectLocation.bind(this);
    }

    componentDidMount() {
        this.props.setVersion('smart');
        if (!this.props.userLocation) {
            this.getUserLocation();
        }
        if (this.props.showLocationForm === true) {
            this.props.toggleLocationForm();
        }
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

    _toggleLocationForm(e) {
        this.props.toggleLocationForm();

        // if showing, focus on input
        if (this.props.showLocationForm === false) {
            setTimeout(() => {
                document.getElementById('location-input').focus();
            });
        }
    }

    _handleLocationChange(e) {
        this.props.locationChange(e.target.value);
    }

    _selectLocation(location) {
        this.props.setUserLocation(location);
        this.props.toggleLocationForm();
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

    _getLocationClass() {
        const isExtraSmall = this.props.screen.mediaType === 'extraSmall';
        if (isExtraSmall) {
            return 'smart__input__form__location--wide';
        }
        return 'smart__input__form__location'
    }

    render() {
        const { userInput, areResultsEmpty, userLocation, showLocationForm, locationPredictions } = this.props;
        return (
            <div className="container smart">
                <div className="smart__input">
                    <h4 className="smart__input__header">What are you in the mood for?</h4>
                    <div className="smart__input__form">
                        <input className="smart__input__form__textarea"
                                  placeholder="e.g. Cheap restaurant for a dinner with friends"
                                  onChange={(e) => this._handleInputChange(e)}
                        ></input>
                        <div className={this._getLocationClass()}>
                            <div>Searching location:</div>
                            <div className="smart__input__form__location__spin">
                                { !showLocationForm && !userLocation && <Spinner />}
                            </div>
                            <div className="smart__input__form__location__loc">
                                { !showLocationForm && userLocation && userLocation }
                            </div>
                            <div className="smart__input__form__location__change" onClick={(e) => this._toggleLocationForm(e)}>
                                { !showLocationForm && '(Change location)' }
                            </div>
                            { showLocationForm &&
                                <div className="smart__input__form__location__input">
                                    <LocationInput
                                        placeholder="Enter location"
                                        options={locationPredictions}
                                        onBlur={(e) => this._toggleLocationForm(e)}
                                        onKeyUp={(e) => this._handleLocationChange(e)}
                                        onOptionSelected={(val) => this._selectLocation(val)}
                                    />
                                </div>
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
    screen: PropTypes.object.isRequired,
    userLocation: PropTypes.string,
    userInput: PropTypes.string,
    showLocationForm: PropTypes.bool,
    locationPredictions: PropTypes.array
};

function mapStateToProps(state) {
    return {
        areResultsEmpty: isEmpty(state.results.results),
        userInput: state.search.userInput,
        userLocation: state.search.userLocation,
        showLocationForm: state.search.showLocationForm,
        screen: state.screen,
        locationPredictions: state.search.locationPredictions
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
        locationChange: (input) => {
            dispatch(locationChange(input))
        },
        setUserLocation: (location) => {
            dispatch(setUserLocation(location));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
