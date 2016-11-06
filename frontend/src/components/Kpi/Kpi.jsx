import React, { Component, PropTypes } from 'react';

class Kpi extends Component {
    render() {
        return (
            <div className="kpi">
                <div className="kpi__value">{this.props.value}</div>
                <div className="kpi__label">{this.props.label}</div>
            </div>
        );
    }
}

Kpi.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default Kpi;
