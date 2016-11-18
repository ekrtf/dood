import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResultItem } from '../../components';
import { submitSearch } from '../../actions/search.actions';
import { selectItem } from '../../actions/results.actions';

class Results extends Component {
    constructor(props) {
        super(props);
        this._renderResult = this._renderResult.bind(this);
    }

    _renderResult(result, index) {
        const { doSelectItem } = this.props;
        return (
            <div key={index} className="results__item">
                <ResultItem index={index} result={result} onSelect={doSelectItem}/>
            </div>
        );
    }

    render() {
        const { isPosting, results, selectedItem } = this.props;
        return (
            <div className="results">
                { isPosting && (<div>Loading...</div>) }
                { !isPosting && Array.isArray(results) && results.map(this._renderResult) }
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
        },
        doSelectItem: (itemId) => {
            dispatch(selectItem(itemId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
