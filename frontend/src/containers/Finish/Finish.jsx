import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Finish extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const versionStr = this.props.version === 'ml' ? ' smart' : ' clone';
        const other = versionStr === ' smart' ? ' clone' : ' smart';
        const otherLink = other === ' smart' ? '/ml' : '/clone';

        return (
            <div className="finish container">
                <div className="finish__greet">Thank you for participating in the research!</div>
                <div className="finish__info">
                    You were randomly given the 
                    <span className="finish__info__strong">{versionStr}</span> version.
                </div>
                <div className="finish__info">
                    You can check out the 
                    <span className="finish__info__strong">{other}</span> version&ensp;
                    <Link className="finish__info__link" to={otherLink}>here</Link>.
                </div>
            </div>
        );
    }
}

Finish.propTypes = {
    version: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        version: state.results.version
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Finish);
