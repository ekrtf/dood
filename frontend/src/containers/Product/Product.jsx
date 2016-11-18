import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.props.product;
        return (
            <div>
                { name }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.results.selectedItem || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
