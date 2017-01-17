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
        const itemId = this.props.result.id;
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
        const { id, name, price, rating, phone, location } = result;
        const categories = result.categories.map(c => c.title);
        const numberOfReviews = result.review_count;
        const imageUrl = result.image_url; // TODO normalize this on the server

        return (
            <Link to={`/clone/results/${id}`} onClick={(e) => this.selectItem(e)}>
                <div className="ritem">
                    <div className="ritem__image">
                        <img className="ritem__image__img" alt="pic" src={imageUrl} />
                    </div>
                    <div className="ritem__info">
                        <div className="ritem__info__name">{name}</div>
                        { this._renderCategories() }
                        <div>{price}</div>
                        <Rating
                            start={0}
                            stop={5}
                            readonly={true}
                            initialRate={rating}
                            empty="glyphicon glyphicon-star-empty"
                            full="glyphicon glyphicon-star"
                        />
                        <div>{numberOfReviews} Reviews</div>
                    </div>
                    <div className="ritem__contact">
                        <div>{location.address1}</div>
                        <div>{location.address2}</div>
                        <div>{location.address3}</div>
                        <div>{location.city}</div>
                        <div>{location.country}</div>
                        <div>{phone}</div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default ResultItem;
