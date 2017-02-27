import React, { Component } from 'react';
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
        const { resultId, name, price, rating, phone, location } = result;
        const categories = result.categories.map(c => c.title);
        const imageUrl = result.imageUrl;

        return (
            <div className="ritem">
                <Link to={`/results/${resultId}`} onClick={(e) => this.selectItem(e)}>
                    <div className="ritem__bg">
                        <img className="ritem__image__img" alt="pic" src={imageUrl} />
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
                            <div>{location.address1}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ResultItem;
