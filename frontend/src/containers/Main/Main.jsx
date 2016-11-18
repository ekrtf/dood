import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Product, Results, Search } from '../.';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedItem } = this.props;
        const isItemSelected = Object.keys(selectedItem).length !== 0;
        return (
            <div>
                { !isItemSelected &&
                    <div>
                        <Search />
                        <Results />
                    </div>
                }
                {
                    isItemSelected &&
                    <Product />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedItem: state.results.selectedItem || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
