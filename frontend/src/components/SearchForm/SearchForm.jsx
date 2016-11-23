import _ from 'lodash';
import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.term = '';
        this.destination = '';

        this.handleSubmit = this.handleSubmit.bind(this);
        this.destinationChange = this.destinationChange.bind(this);
        this.termChange = this.termChange.bind(this);
    }

    handleSubmit() {
        // TODO validate input
        this.props.onSubmit({
            term: this.term,
            destination: this.destination
        });
    }

    termChange(e) {
        this.term = e.target.value;
    }

    destinationChange(e) {
        this.destination = e.target.value
    }

    render() {
        // TODO wire forms to redux
        return (
            <div className="searchform">
                <div className="searchform__item--destination">
                    <FormControl type="text" placeholder="What are you looking for?" onChange={this.termChange} />
                </div>
                <div className="searchform__item--destination">
                    <FormControl type="text" placeholder="Destination" onChange={this.destinationChange} />
                </div>
                <div className="searchform__item">
                    <button onClick={this.handleSubmit} className="button big">Search</button>
                </div>
            </div>
        );
    }

}

export default SearchForm;
