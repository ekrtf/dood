import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { fetchSuggestions } from '../../actions/product.actions';

class Suggestions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="suggestions">
            </div>
        );
    }
}

Suggestions.propTypes = {
};

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
