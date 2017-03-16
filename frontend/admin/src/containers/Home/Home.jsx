import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { map } from 'lodash';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { version, feedback } = this.props;
        return (
            <div className="container home">
                <div>{version}</div>
                <div>Feedback</div>
                <div>
                    { map(feedback, (f, i) => 
                        (<div key={i}>{f.comment}</div>)
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        feedback: state.main.feedback
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
