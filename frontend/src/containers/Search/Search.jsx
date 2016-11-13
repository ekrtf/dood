import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../../components';
import { submitSearch } from '../../actions/search.actions';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onSearchSubmit, destination, isPosting, results } = this.props;

        return (
            <div className="search">

                <div className="search__form">
                    <SearchForm onSubmit={onSearchSubmit} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isPosting: state.search.isPosting,
        destination: state.search.destination,
        fromDate: state.search.fromDate,
        toDate: state.search.toDate,
        results: state.search.results
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchSubmit: (search) => {
            dispatch(submitSearch(search));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
