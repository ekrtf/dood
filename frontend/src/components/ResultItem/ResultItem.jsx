import React, { Component } from 'react';

class ResultItem extends Component {
    constructor(props) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem(e) {
        e.stopPropagation();
        // TODO navigate to product page
    }

    render() {
        const result = this.props.result;
        const { name, price, rating, phone } = result;
        const categories = result.categories.map(c => c.title);
        const location = result.location.city;
        const imageUrl = result.image_url; // TODO normalize this on the server

        return (
            <div className="ritem" onClick={this.selectItem}>
                <div>Name: {name}</div>
                <div>Price: {price}</div>
                <div>Rating: {rating}</div>
                <div>Phone: {phone}</div>
                <img className="ritem__img" alt="pic" src={imageUrl} />
            </div>
        );
    }
}

export default ResultItem;
