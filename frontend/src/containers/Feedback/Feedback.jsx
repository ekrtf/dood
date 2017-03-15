import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { setRating, setEmail, setComment, submitFeedback } from '../../actions/product.actions';
import { Link } from 'react-router';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this._handleRatingChange = this._handleRatingChange.bind(this);
        this._handleCommentChange = this._handleCommentChange.bind(this);
        this._handleEmailChange = this._handleEmailChange.bind(this);
        this._handleFinish = this._handleFinish.bind(this);
        this._getButtonClass = this._getButtonClass.bind(this);
    }

    componentDidMount() {
        // scroll to top of page
        window.scrollTo(0, 0);
        // reset rating
        this.props.setRating(null);
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

    _getButtonClass() {
        if (!this.props.rating || !this.props.comment) {
            return 'feedback__submit--disabled';
        }
        return 'feedback__submit';
    }

    render() {
        const { rating, disableFinish } = this.props;
        return (
            <div className="container feedback">
                <div className="feedback__greet">Almost done!</div>
                <div className="feedback__prompt">
                    <h4>Please rate your overall experience</h4>
                    <div className="feedback__prompt__rating">
                        <div className="feedback__prompt__rating__stars">
                            <Rating
                                start={0}
                                stop={5}
                                initialRate={rating}
                                onChange={(e) => this._handleRatingChange(e)}
                                empty="glyphicon glyphicon-star-empty"
                                full="glyphicon glyphicon-star"
                            />
                        </div>
                    </div>
                    <textarea className="feedback__prompt__message"
                        placeholder="Any additional comments?"
                        onChange={(e) => this._handleCommentChange(e)}
                    ></textarea>
                </div>
                <div className="feedback__email">
                    <p>If you are curious about the results, enter your email here and
                    results will be sent to you (nothing else, I promise)</p>
                    <input type="text"
                        placeholder="hola@me.com (optional)"
                        className="feedback__email__input"
                        onChange={(e) => this._handleEmailChange(e)}
                    />
                </div>
                <div className={this._getButtonClass()}>
                    <Link to="/finish">
                        <button onClick={(e) => this._handleFinish(e)}
                                disabled={disableFinish}
                        >
                            Done
                            <i className="em em-raised_hands"></i>
                        </button>
                    </Link>
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
