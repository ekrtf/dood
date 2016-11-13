import React, { Component } from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { Button, FormControl, FormGroup, Radio } from 'react-bootstrap';

let destination = null;
let fromDate = new Date().toISOString();
let toDate = new Date().toISOString();

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.destinationChange = this.destinationChange.bind(this);
        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onToDateChange = this.onToDateChange.bind(this);
    }

    handleSubmit() {
        let search = { destination, fromDate, toDate };
        this.props.onSubmit(search);
        destination = null;
        fromDate = null;
        toDate = null;
    }

    destinationChange(e) {
        e.stopPropagation();
        name = e.target.value;
    }

    onFromDateChange(e) {
        e.stopPropagation();
        fromDate = e.target.value;
    }

    onToDateChange(e) {
        e.stopPropagation();
        toDate = e.target.value;
    }

    render() {
        return (
            <div className="searchform">
                <FormControl type="text" placeholder="Destination" value={destination} onChange={this.destinationChange} />
                <div className="searchform__dates">
                    <div className="searchform__dates__first">
                        From
                        <DatePicker value={fromDate} onChange={this.onFromDateChange} />
                    </div>
                    <div>
                        To
                        <DatePicker value={toDate} onChange={this.onToDateChange} />
                    </div>
                </div>

                <Button onClick={this.handleSubmit} className="button big">Search</Button>
            </div>
        );
    }

}

export default SearchForm;
