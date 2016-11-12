import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landing">
                Welcome to my experiment.
            </div>
        );
    }
}

Landing.propTypes = {
    
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
