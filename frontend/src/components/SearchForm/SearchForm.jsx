import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Button, FormControl, FormGroup, Radio } from 'react-bootstrap';

let name, currency;
let value1 = new Date().toISOString();
let value2 = new Date().toISOString();

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    handleChangeData() {

    }

    destinationChange(e) {
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
                <FormControl type="text" placeholder="Destination" value={name} onChange={this.destinationChange} />
                <div className="searchform__dates">
                    <div className="searchform__dates__first">
                        From
                        <DatePicker value={value1} onChange={this.handleChangeData} />
                    </div>
                    <div>
                        To
                        <DatePicker value={value1} onChange={this.handleChangeData} />
                    </div>
                </div>

                <Button className="button big">Search</Button>
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
