import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
import { setVersion } from '../../actions/results.actions';
import {
    submitSearch,
    termChange,
    destinationChange
} from '../../actions/search.actions';

class Search extends Component {
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
            <div className="search">
                <div className="search__form">
                    <div className="search__form__item--destination">
                        <FormControl type="text" placeholder="What are you looking for?" onChange={(e) => this._handleTermChange(e)} />
                    </div>
                    <div className="search__form__item--destination">
                        <FormControl type="text" placeholder="Destination" onChange={(e) => this._handleDestinationChange(e)} />
                    </div>
                    <div className="search__form__item">
                        <Link to="/clone/results" onClick={(e) => this._handleSubmit(e)}>
                            <button className="button big">Search</button>
                        </Link>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
