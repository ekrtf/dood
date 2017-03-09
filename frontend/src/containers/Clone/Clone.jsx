import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Results } from '../.';
import { LocationInput } from '../../components';
import { setVersion } from '../../actions/results.actions';
import {
    submitSearch,
    termChange,
    locationChange,
    setUserLocation,
    toggleSuggestions
} from '../../actions/search.actions';

class Clone extends Component {
    constructor(props) {
        super(props);
        this._handleTermChange = this._handleTermChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._getButtonClass = this._getButtonClass.bind(this);

        this._handleLocationChange = this._handleLocationChange.bind(this);
        this._selectLocation = this._selectLocation.bind(this);

        this._handleBlur = this._handleBlur.bind(this);
    }

    componentDidMount() {
        this.props.setVersion('clone');
    }

    _handleTermChange(e) {
        this.props.onSearchTermChange(e.target.value);
    }

    _handleLocationChange(e) {
        this.props.locationChange(e.target.value);
        if (this.props.showSuggestions === false) {
            this.props.toggleSuggestions();
        }
    }

    _selectLocation(location) {
        this.props.setUserLocation(location);
    }

    _handleBlur(e) {
        this.props.toggleSuggestions();
    }

    _handleSubmit(e) {
        this.props.onSearchSubmit();
    }

    _getButtonClass() {
        if (!this.props.userLocation || !this.props.term) {
            return 'clone__form__item--submit--disabled col-md-4';
        }
        return 'clone__form__item--submit col-md-4';
    }

    render() {
        const { locationPredictions, showSuggestions } = this.props;

        return (
            <div className="container clone">
                <div className="clone__form">
                    <div className="clone__form__item col-md-4">
                        <input type="text" placeholder="What are you looking for?" onChange={(e) => this._handleTermChange(e)} />
                    </div>
                    <div className="clone__form__item col-md-4">
                        <LocationInput
                            placeholder="Where?"
                            options={showSuggestions ? locationPredictions : []}
                            onBlur={(e) => this._handleBlur(e)}
                            onKeyUp={(e) => this._handleLocationChange(e)}
                            onOptionSelected={(val) => this._selectLocation(val)}
                        />
                    </div>
                    <div className={this._getButtonClass()}>
                        <button onClick={(e) => this._handleSubmit(e)}>Search</button>
                    </div>
                </div>
                <div className="clone__output">
                    <Results />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.search.userLocation,
        term: state.search.term,
        locationPredictions: state.search.locationPredictions,
        showSuggestions: state.search.showSuggestions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchSubmit: () => {
            dispatch(submitSearch());
        },
        onSearchTermChange: (term) => {
            dispatch(termChange(term));
        },
        locationChange: (input) => {
            dispatch(locationChange(input));
        },
        setUserLocation: (location) => {
            dispatch(setUserLocation(location));
        },
        setVersion: (version) => {
            dispatch(setVersion(version));
        },
        toggleSuggestions: () => {
            dispatch(toggleSuggestions());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clone);
