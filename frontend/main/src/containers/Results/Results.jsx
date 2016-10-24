import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import { isArray, isEmpty } from 'lodash';
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
        const isExtraSmall = this.props.screen.mediaType === 'extraSmall';

        return (
            <div key={index} className="results__item">
                <ResultItem index={index} result={result} isWide={isExtraSmall} onSelect={doSelectItem}/>
            </div>
        );
    }

    render() {
        const { isPosting, results, hasSearchFailed } = this.props;
        const isExtraSmall = this.props.screen.mediaType === 'extraSmall';
        const isSmart = this.props.version === 'smart';

        return (
            <div className={isExtraSmall ? 'results--small' : 'results'}>
                { isPosting && 
                    <div className="results__spinner">
                        <div className="results__spinner__container">
                            <Spinner />
                        </div>
                        <div>Getting results from {isSmart ? 'Yelp, Foursquare, Zomato, Google Places' : 'Yelp'}</div>
                    </div>
                }
                { !isPosting && isArray(results) && results.map(this._renderResult) }
                { !isPosting && hasSearchFailed &&
                    <div className="results__empty">
                        {`Whoops! Looks like I can't find anything matching your request. Please
                        try something else.`}
                    </div>
                }
            </div>
        );
    }
}

Results.propTypes = {
    isPosting: PropTypes.bool.isRequired,
    screen: PropTypes.object.isRequired,
    version: PropTypes.string,
    results: PropTypes.array
};

function mapStateToProps(state) {
    return {
        isPosting: state.search.isPosting,
        results: state.results.results,
        screen: state.screen,
        version: state.results.version,
        hasSearchFailed: state.search.hasSearchFailed
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
