import React, { Component } from 'react';

class ResultItem extends Component {
    render() {
        const result = this.props.result;
        const { name, price, rating, phone } = result;
        const categories = result.categories.map(c => c.title);
        const location = result.location.city;

        return (
            <div className="ritem">
                TODO
            </div>
        );
    }
}

export default ResultItem;
