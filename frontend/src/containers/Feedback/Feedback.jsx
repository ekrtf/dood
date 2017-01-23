import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';

class Feedback extends Component {
    render() {
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
                            empty="glyphicon glyphicon-star-empty"
                            full="glyphicon glyphicon-star"
                        />
                    </div>
                    <textarea className="feedback__prompt__message"
                        placeholder="Any additional comments?"
                        onChange={(e) => {}}
                    ></textarea>
                </div>
                <div className="feedback__email">
                    If you are curious about the results, enter your email here and
                    results will be sent to you (nothing else, I promise).
                    <input type="text" placeholder="name@howcoolareyou.com (optional)"/>
                </div>
                <div className="feedback__submit">
                    <button onClick={(e) => {}}
                            className="button special big"
                    >Finish</button>
                </div>
            </div>
        );
    }
}

Feedback.propTypes = {
    chosenProduct: PropTypes.object // isRequired
};

function mapStateToProps(state) {
    return {
        chosenProduct: state.product.chosenProduct
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
