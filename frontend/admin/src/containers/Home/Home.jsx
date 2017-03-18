import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { map } from 'lodash';
import moment from 'moment';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { feedback } = this.props;
        return (
            <div className="container home">
                <div className="home__size">

                </div>
                <div className="home__feedback">
                    <h4>Feedback</h4>
                    <table className="table-stripped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Comment</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { map(feedback, (f, i) => 
                                <tr key={i} className="home__feedback__item">
                                    <td className="home__feedback__item__date">
                                        {moment.unix(f.createdAt).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="home__feedback__item__comment">
                                        {f.comment}
                                    </td>
                                    <td className="home__feedback__item__email">
                                        {f.email || 'no email'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

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
