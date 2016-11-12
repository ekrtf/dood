import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, DropdownButton, MenuItem, ProgressBar } from 'react-bootstrap';
import { SearchForm } from '../../components';
import {
    getLastImportDate,
    getLatestKpis,
    selectCurrency,
    loadAccountsSummary
} from '../../actions/dashboard.actions';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            latest,
            currency,
            selectCurrency,
            summary
        } = this.props;

        return (
            <div className="search">

                <div className="search__form">
                    <SearchForm />
                </div>

            </div>
        );
    }
}

Search.propTypes = {
    latest: PropTypes.string.isRequired,

    getAccountsSummary: PropTypes.func.isRequired,
    getTimestamp: PropTypes.func.isRequired,

    selectCurrency: PropTypes.func.isRequired,

    currency: PropTypes.string.isRequired,
    summary: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        currency: state.dashboard.currency,
        latest: state.dashboard.latest,
        kpis: state.dashboard.kpis,
        summary: state.dashboard.summary
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAccountsSummary: () => {
            dispatch(loadAccountsSummary());
        },
        selectCurrency: (currency) => {
            dispatch(selectCurrency(currency));
        },
        getTimestamp: () => {
            dispatch(getLastImportDate());
        },
        getKpis: () => {
            dispatch(getLatestKpis());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
