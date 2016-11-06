import React, { Component, PropTypes } from 'react';
import { Button, FormControl, FormGroup, Modal, Radio } from 'react-bootstrap';

class AccountSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this._renderOption = this._renderOption.bind(this);
    }

    handleChange(e) {
        let id = e.target.value;
        if (id !== this.props.selected) {
            this.props.onSelect(id);
        }
    }

    render() {
        const { options } = this.props;

        return (
            <FormControl componentClass="select" placeholder="all" onChange={(e) => this.handleChange(e)}>
                <option value="all">all</option>
                {options.map(this._renderOption)}
            </FormControl>
        );
    }

    _renderOption(opt, index) {
        let symbol =
            opt.currency === 'usd' ? '$' :
            opt.currency === 'eur' ? '€' :
            opt.currency === 'gbp' ? '£' :
            'unknown currency';

        return (<option key={index} value={opt.accountId}>{opt.name} - {symbol}</option>);
    }

}

AccountSelector.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default AccountSelector;
