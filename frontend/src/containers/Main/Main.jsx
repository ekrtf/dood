import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Results, Search } from '../.';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search">
                <Search />
                <Results />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
