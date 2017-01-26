import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { setRating, setEmail, setComment, submitFeedback } from '../../actions/product.actions';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this._handleRatingChange = this._handleRatingChange.bind(this);
        this._handleCommentChange = this._handleCommentChange.bind(this);
        this._handleEmailChange = this._handleEmailChange.bind(this);
        this._handleFinish = this._handleFinish.bind(this);
    }

    _handleRatingChange(rating) {
        this.props.setRating(rating);
    }

    _handleCommentChange(e) {
        this.props.setComment(e.target.value);
    }

    _handleEmailChange(e) {
        this.props.setEmail(e.target.value);
    }

    _handleFinish(e) {
        this.props.submitFeedback();
    }

    render() {
        const { rating, disableFinish } = this.props;
        return (
            <div className="feedback">
                <div className="feedback__greet">
                    <h1>Thank you for participating in the research!</h1>
                </div>
                <div className="feedback__prompt">
                    <h3>Please rate your overall experience:</h3>
                    <div className="feedback__prompt__rating">
                        <Rating
                            start={0}
                            stop={5}
                            initialRate={rating}
                            onChange={(e) => this._handleRatingChange(e)}
                            empty="glyphicon glyphicon-star-empty"
                            full="glyphicon glyphicon-star"
                        />
                    </div>
                    <textarea className="feedback__prompt__message"
                        placeholder="Any additional comments?"
                        onChange={(e) => this._handleCommentChange(e)}
                    ></textarea>
                </div>
                <div className="feedback__email">
                    If you are curious about the results, enter your email here and
                    results will be sent to you (nothing else, I promise).
                    <input type="text"
                        placeholder="name@howcoolareyou.com (optional)"
                        onChange={(e) => this._handleEmailChange(e)}
                    />
                </div>
                <div className="feedback__submit">
                    <button onClick={(e) => this._handleFinish(e)}
                            className="button special big"
                            disabled={disableFinish}
                    >Finish</button>
                </div>
            </div>
        );
    }
}

Feedback.propTypes = {
    chosenProduct: PropTypes.object, // isRequired
    rating: PropTypes.number,
    email: PropTypes.string,
    comment: PropTypes.string,
    isSubmitted: PropTypes.bool,
    disableFinish: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        chosenProduct: state.product.chosenProduct,
        rating: state.product.rating,
        email: state.product.email,
        comment: state.product.comment,
        isSubmitted: state.product.isSubmitted,
        disableFinish: state.product.disableFinish
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setRating: (rating) => {
            dispatch(setRating(rating));
        },
        setEmail: (email) => {
            dispatch(setEmail(email));
        },
        setComment: (comment) => {
            dispatch(setComment(comment));
        },
        submitFeedback: () => {
            dispatch(submitFeedback())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
