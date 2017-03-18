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
        const { feedback, averageRating, numberOfSearches, numberOfSearchesWithChoice } = this.props;
        return (
            <div className="home">
                <div className="home__item">
                    <h4>Total number of searches</h4>
                    <div>{numberOfSearches}</div>
                </div>
                <div className="home__item">
                    <h4>Total number successful searches</h4>
                    <div>{numberOfSearchesWithChoice}</div>
                </div>
                <div className="home__item">
                    <h4>Comversion rate</h4>
                    <div>{numberOfSearchesWithChoice/numberOfSearches}</div>
                </div>
                <div className="home__item">
                    <h4>Average rating</h4>
                    <div>{averageRating}</div>
                </div>
                <div className="home__item">
                    <h4>Feedback</h4>
                    <table className="table-stripped">
                        <thead>
                            <tr>
                                <th className="home__feedback__item__date">Date</th>
                                <th className="home__feedback__item__comment">Comment</th>
                                <th className="home__feedback__item__rating">Rating</th>
                                <th className="home__feedback__item__email">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { map(feedback, (f, i) => 
                                <tr key={i} className="home__feedback__item">
                                    <td className="home__feedback__item__date">
                                        {moment.unix(f.createdAt).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="home__feedback__item__comment">
                                        <div>{f.comment}</div>
                                    </td>
                                    <td className="home__feedback__item__rating">
                                        {f.rating}
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
        feedback: state.main.feedback,
        averageRating: state.main.averageRating,
        numberOfSearches: state.main.numberOfSearches,
        numberOfSearchesWithChoice: state.main.numberOfSearchesWithChoice
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
