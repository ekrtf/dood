import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Rating from 'react-rating';

class ResultItem extends Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem(e) {
        e.stopPropagation();
        const itemId = this.props.result.resultId;
        this.props.onSelect(itemId);
        // TODO navigate to product page
    }

    _renderCategories() {
        const categories = this.props.result.categories.map(c => c.title);
        const tags = categories.map((item, index) => {
            return (<div key={index}>{item}</div>);
        });
        return (<div>{ tags }</div>);
    }

    render() {
        const result = this.props.result;
        const isWide = this.props.isWide;
        const { resultId, name, price, rating, phone, addressLine } = result;
        const categories = result.categories.map(c => c.title);
        const imageUrl = result.imageUrl;

        return (
            <div className={isWide ? 'ritem--wide' : 'ritem'}>
                <Link to={`/results/${resultId}`} onClick={(e) => this.selectItem(e)}>
                    <div className="ritem__bg">
                        <img className={isWide ? 'ritem__image__img--wide' : 'ritem__image__img'}
                             alt="pic"
                             src={imageUrl} />
                    </div>
                    <div className="ritem__overlay"></div>
                    <div className="ritem__content">
                        <div>
                            <div className="ritem__content__name">{name}</div>
                            <div className="ritem__content__price">{price}</div>
                            <div className="ritem__content__categories">{ this._renderCategories() }</div>
                        </div>
                        <div>
                            <div className="ritem__content__rating">
                                <Rating
                                    start={0}
                                    stop={5}
                                    readonly={true}
                                    initialRate={Number(rating)}
                                    empty="glyphicon glyphicon-star-empty"
                                    full="glyphicon glyphicon-star"
                                />
                            </div>
                            <div>{addressLine}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

ResultItem.propTypes = {
    isWide: PropTypes.bool.isRequired
};

export default ResultItem;
