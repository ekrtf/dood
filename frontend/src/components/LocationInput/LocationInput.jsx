import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Typeahead } from 'react-typeahead';
import { isFunction } from 'lodash';

class LocationInput extends Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }

    onBlur(e) {
        if (e.relatedTarget) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (isFunction(this.props.onBlur)) {
                this.props.onBlur();
            }
        }
    }

    render() {
        const {
            placeholder,
            options,
            onKeyUp,
            onOptionSelected
        } = this.props;

        const inputProps = {
            id: 'location-input'
        };

        return (
            <div className="li">
                <Typeahead
                    inputProps={inputProps}
                    placeholder={placeholder}
                    onKeyUp={onKeyUp}
                    onBlur={(e) => this.onBlur(e)}
                    onOptionSelected={onOptionSelected}
                    options={options}
                    maxVisible={5}
                />
            </div>
        );
    }
}

LocationInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    options: PropTypes.array
};

export default LocationInput;
