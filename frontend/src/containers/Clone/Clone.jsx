import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Results } from '../.';
import { setVersion } from '../../actions/results.actions';
import {
    submitSearch,
    termChange,
    destinationChange
} from '../../actions/search.actions';

class Clone extends Component {
    constructor(props) {
        super(props);
        this._handleTermChange = this._handleTermChange.bind(this);
        this._handleDestinationChange = this._handleDestinationChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setVersion('clone');
    }

    _handleTermChange(e) {
        this.props.onSearchTermChange(e.target.value);
    }

    _handleDestinationChange(e) {
        this.props.onSearchDestinationChange(e.target.value);
    }

    _handleSubmit(e) {
        this.props.onSearchSubmit();
    }

    render() {
        return (
            <div className="container clone">
                <div className="clone__form">
                    <div className="clone__form__item col-md-4">
                        <input type="text" placeholder="What are you looking for?" onChange={(e) => this._handleTermChange(e)} />
                    </div>
                    <div className="clone__form__item col-md-4">
                        <input type="text" placeholder="City" onChange={(e) => this._handleDestinationChange(e)} />
                    </div>
                    <div className="clone__form__item--submit col-md-4">
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
        destination: state.search.destination,
        term: state.search.fromDate,
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
        onSearchDestinationChange: (destination) => {
            dispatch(destinationChange(destination));
        },
        setVersion: (version) => {
            dispatch(setVersion(version));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clone);
