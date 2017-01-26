import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../../components';
import { setVersion } from '../../actions/results.actions';
import {
    submitSearch,
    termChange,
    destinationChange
} from '../../actions/search.actions';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setVersion('clone');
    }

    render() {
        const {
            onSearchSubmit,
            onSearchTermChange,
            onSearchDestinationChange,
            destination,
            term
        } = this.props;

        return (
            <div className="search">
                <div className="search__form">
                    <SearchForm
                        onSubmit={onSearchSubmit}
                        onTermChange={onSearchTermChange}
                        onDestinationChange={onSearchDestinationChange}
                        destination={destination}
                        term={term}
                    />
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
        onSearchSubmit: (search) => {
            dispatch(submitSearch(search));
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
