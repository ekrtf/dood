import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, DropdownButton, MenuItem, ProgressBar } from 'react-bootstrap';
import { AccountsSummary, Kpi, DonutChart } from '../../components';
import {
    getLastImportDate,
    getLatestKpis,
    selectCurrency,
    loadAccountsSummary
} from '../../actions/dashboard.actions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAccountsSummary();
        this.props.getTimestamp();
        this.props.getKpis();
    }

    render() {
        const {
            latest,
            currency,
            selectCurrency,
            kpis,
            summary
        } = this.props;

        return (
            <div className="dashboard">

                <div className="dashboard__header">
                    <div className="timestamp">{latest}</div>
                    <ButtonGroup className="currency">
                        <Button active={currency === 'gbp'} onClick={() => selectCurrency('gbp')}>£</Button>
                        <Button active={currency === 'eur'} onClick={() => selectCurrency('eur')}>€</Button>
                        <Button active={currency === 'usd'} onClick={() => selectCurrency('usd')}>$</Button>
                     </ButtonGroup>
                     {false && <DropdownButton title="Export" id="bg-vertical-dropdown-1">
                         <MenuItem eventKey="1">CSV</MenuItem>
                         <MenuItem eventKey="2">Excel</MenuItem>
                         <MenuItem eventKey="3" disabled={true}>PDF</MenuItem>
                     </DropdownButton>}
                </div>

                <div className="dashboard__kpis">
                    {kpis.map(this._renderKpi.bind(this))}
                </div>

                <AccountsSummary accounts={summary} currency={currency} />

                {false && <DonutChart />}
                {false &&
                    <div className="dashboard__month">
                        <div className="dm__month">May</div>
                        <div className="dm__budget">{'$689.45'}</div>
                        <ProgressBar now={80} />
                    </div>
                }
            </div>
        );
    }

    _renderKpi(kpi, index) {
        return (<Kpi key={index} label={kpi.label} value={kpi.value} />);
    }
}

Dashboard.propTypes = {
    latest: PropTypes.string.isRequired,

    getAccountsSummary: PropTypes.func.isRequired,
    getTimestamp: PropTypes.func.isRequired,
    getKpis: PropTypes.func.isRequired,

    selectCurrency: PropTypes.func.isRequired,

    currency: PropTypes.string.isRequired,
    kpis: PropTypes.array.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
