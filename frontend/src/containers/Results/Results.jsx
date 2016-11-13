import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../../components';
import { submitSearch } from '../../actions/search.actions';

class Results extends Component {
    constructor(props) {
        super(props);
        this._renderResult = this._renderResult.bind(this);
    }

    _renderResult(result, index) {
        return (
            <div key={index}>{result.name}</div>
        );
    }

    render() {
        const { results } = this.props;

        return (
            <div className="search">
                { Array.isArray(results) && results.map(this._renderResult) }
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
