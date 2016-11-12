import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Button, FormControl, FormGroup, Radio } from 'react-bootstrap';

let name, currency;
let value1 = new Date().toISOString();
let value2 = new Date().toISOString();

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        if (name !== '' && currency) {
            onSubmit({ name, currency });
            name = null;
            currency = null;
        }
    }

    handleChangeData() {

    }

    nameChange(e) {
        name = e.target.value;
    }

    currencyChange(e) {
        currency = e.target.value;
    }

    render() {
        const {
            showModal,
            onSubmit,
            onCancel
        } = this.props;

        return (
            <div className="searchform">
                <form className="searchform__form">
                    <FormControl type="text" placeholder="Destination" value={name} onChange={this.nameChange} />
                    <FormControl type="text" placeholder="Account name" value={name} onChange={this.nameChange} />
                    
                    <DatePicker value={value1} onChange={this.handleChangeData} />
                    <DatePicker value={value2} onChange={this.handleChangeData} />

                    <FormGroup className="currency" value={currency} onChange={this.currencyChange}>
                        <Radio inline value="gbp">£</Radio>
                        <Radio inline value="eur">€</Radio>
                        <Radio inline value="usd">$</Radio>
                    </FormGroup>
                </form>
            </div>
        );
    }

}

SearchForm.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func.isRequired
};

export default SearchForm;
