import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { isEmpty, debounce } from 'lodash';
import Spinner from 'react-spinner';
import { Results } from '../.';
import { ResultItem, LocationInput } from '../../components';
import { setVersion } from '../../actions/results.actions';
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
        this._handleKeyPress = this._handleKeyPress.bind(this);
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
            if (this.props.showLocationForm === false) {
                this.props.toggleLocationForm();
            }
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (position) => {
            this.props.getUserLocation({
                timestamp: position.timestamp,
                accuracy: position.coords.accuracy,
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        };

        const error = (err) => {
            if (this.props.showLocationForm === false) {
                this.props.toggleLocationForm();
            }
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    _handleKeyPress(e) {
        const { userInput, userLocation } = this.props;
        if (e.key === 'Enter' && !isEmpty(userLocation) && !isEmpty(userInput)) {
            this.props.smartSearch(userInput, userLocation);
        }
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
        const {
            setUserLocation,
            toggleLocationForm,
            userLocation,
            userInput,
            smartSearch
        } = this.props;

        setUserLocation(location);
        toggleLocationForm();
        if (!isEmpty(userLocation) && !isEmpty(userInput)) {
            smartSearch(userInput, userLocation);
        }
    }

    _handleInputChange(e) {
        const input = e.target.value;
        this.props.userInputChange(input);
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

    _doSmartSearch(e) {
        this.props.smartSearch(this.props.userInput, this.props.userLocation);
    }

    render() {
        const { userInput, areResultsEmpty, userLocation, showLocationForm, locationPredictions } = this.props;
        return (
            <div className="container smart">
                <div className="smart__input">
                    <h4 className="smart__input__header">What are you in the mood for?</h4>
                    <div className="smart__input__form">
                        <textarea className="smart__input__form__textarea"
                                  placeholder="e.g. Restaurant not too expensive for a dinner with friends with music and there is a vegan with us"
                                  onChange={(e) => this._handleInputChange(e)}
                                  onKeyPress={(e) => this._handleKeyPress(e)}
                        ></textarea>
                        <div className={this._getLocationClass()}>
                            <div>Searching in:</div>
                            <div className="smart__input__form__location__spin">
                                { !showLocationForm && !userLocation && <Spinner />}
                            </div>
                            <div className="smart__input__form__location__loc">
                                { !showLocationForm && userLocation && userLocation }
                            </div>
                            <div className="smart__input__form__location__change" onClick={(e) => this._toggleLocationForm(e)}>
                                { !showLocationForm && '(Change city)' }
                            </div>
                            { showLocationForm &&
                                <div className="smart__input__form__location__input">
                                    <LocationInput
                                        placeholder="Enter location"
                                        options={locationPredictions}
                                        onBlur={(e) => this._toggleLocationForm(e)}
                                        onKeyUp={(e) => this._handleLocationChange(e)}
                                        onOptionSelected={(val) => this._selectLocation(val)}
                                        onKeyPress={(e) => this._handleKeyPress(e)}
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
        smartSearch: (search, location) => {
            dispatch(smartSearch(search, location));
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
            dispatch(toggleLocationForm());
        },
        locationChange: (input) => {
            dispatch(locationChange(input));
        },
        setUserLocation: (location) => {
            dispatch(setUserLocation(location));
            dispatch(getWeatherKeywords(location));
        },
        postUserDate: () => {
            dispatch(postUserDate());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
