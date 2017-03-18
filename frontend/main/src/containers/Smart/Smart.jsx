import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { isEmpty, debounce } from 'lodash';
import Spinner from 'react-spinner';
import { Results } from '../.';
import { ResultItem, LocationInput } from '../../components';
import { setVersion } from '../../actions/results.actions';
import { removeKeyword } from '../../actions/keywords.actions';
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
        this.autoSearch = debounce(this.autoSearch, 1000);
        this._toggleLocationForm = this._toggleLocationForm.bind(this);
        this._handleLocationChange = this._handleLocationChange.bind(this);
        this._getButtonClass = this._getButtonClass.bind(this);
        this._getLocationClass = this._getLocationClass.bind(this);
        this._selectLocation = this._selectLocation.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._handleRemoveKeyword = this._handleRemoveKeyword.bind(this);
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

    autoSearch() {
        const { userInput, userLocation } = this.props;
        if (!isEmpty(userLocation) && !isEmpty(userInput)) {
            this.props.smartSearch(userInput, userLocation);
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
        this.autoSearch();
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

    _handleRemoveKeyword(keywordId) {
        this.props.removeKeyword(keywordId);

        // HACK. wait for keywords state to be updated before posting new search
        setTimeout(() => {
            if (!isEmpty(this.props.userLocation)) {
                this.props.smartSearch(this.props.keywords.toString(), this.props.userLocation);
            }
        }, 300);
    }

    _renderKeywords() {
        if (!this.props.keywords) return;

        let workingKeywords = this.props.keywords;
        // make sure map runs if single keyword
        if (typeof workingKeywords === 'string') {
            workingKeywords = [ workingKeywords ];
        }

        const tooltip = (<Tooltip id="tooltip">Remove</Tooltip>);
        const keywords = workingKeywords.map((k, i) => (
            <div key={i} className="smart__keywords__button">
                <div className="smart__keywords__button__content">
                    <div className="smart__keywords__button__content__l">{k}</div>
                    <div className="smart__keywords__button__content__x" onClick={(e) => this._handleRemoveKeyword(i)}>
                        { workingKeywords.length > 1 &&
                            <OverlayTrigger placement="top" overlay={tooltip}>
                                <i className="em em-x"></i>
                            </OverlayTrigger>
                        }
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="smart__keywords">
                {keywords}
            </div>
        );
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
                        {this._renderKeywords()}
                    </div>
                </div>

                { false &&
                <div className="smart__suggestions">
                    {areResultsEmpty &&
                        <h4 className="smart__output__title">Not sure? Here are some suggestions</h4>
                    }
                </div>
                }

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
        locationPredictions: state.search.locationPredictions,
        keywords: state.keywords.words
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
        },
        removeKeyword: (keywordId) => {
            dispatch(removeKeyword(keywordId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart);
