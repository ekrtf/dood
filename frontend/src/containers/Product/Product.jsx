import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { toggleImages, selectImage } from '../../actions/product.actions';
import Rating from 'react-rating';

class Product extends Component {
    constructor(props) {
        super(props);

        this.doSelectProduct = this.doSelectProduct.bind(this);
        this.doAddProductToList = this.doAddProductToList.bind(this);

        this._openLightbox = this._openLightbox.bind(this);
        this._goToPrevious = this._goToPrevious.bind(this);
        this._goToNext = this._goToNext.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    doSelectProduct() {
        // TODO
    }

    doAddProductToList() {
        // TODO
    }

    _goToPrevious() {
        const newIndex = this.props.currentImage - 1;
        this.props.doSelectImage(newIndex);
    }

    _goToNext() {
        const newIndex = this.props.currentImage + 1;
        this.props.doSelectImage(newIndex);
    }

    _onClose() {
        this.props.doToggleImages();
    }

    _openLightbox(index, e) {
        e.preventDefault();
        this.props.doToggleImages();
        this.props.doSelectImage(index);
    }

    _renderGallery() {
        const images = this.props.product.images;
        if (!images) return;

		const gallery = images.map((item, index) => {
			return (
				<a key={index} onClick={(e) => this._openLightbox(index, e)}>
					<img className="product__gallery__image" src={item.src} />
				</a>
			);
		});

		return (
			<div className="product__gallery">
                { gallery }
                <Lightbox
                    images={this.props.product.images}
                    currentImage={this.props.currentImage}
                    isOpen={this.props.showImages}
                    onClickPrev={this._goToPrevious}
                    onClickNext={this._goToNext}
                    onClose={this._onClose}
                    enableKeyboardInput={true}
                    showThumbnails={true}
                />
            </div>
		);
    }

    _renderCategories() {
        const categories = this.props.product.categories.map(c => c.title);
        const tags = categories.map((item, index) => {
            return (<div key={index}>{item}</div>);
        });
        return (<div className="product__categories">{ tags }</div>);
    }

    render() {
        const { name, price, rating } = this.props.product;
        console.log(this.props.product)

        return (
            <div className="product">
                <div className="product__back">
                    <i className="glyphicon glyphicon-arrow-left"></i>
                    <div>Back to results</div>
                </div>
                <div className="product__top">
                    <div className="proudct__top__name">{ name }</div>
                    <div className="product__top__buttonbox">
                        <button className="button special" onClick={this.doSelectProduct}>Choose</button>
                        <button className="button" onClick={this.doAddProductToList}>Add to Shortlist</button>
                    </div>
                </div>
                <div className="product__info">
                    <div>{ this._renderCategories() }</div>
                    <Rating
                        start={0}
                        stop={5}
                        readonly={true}
                        initialRate={rating}
                        empty="glyphicon glyphicon-star-empty"
                        full="glyphicon glyphicon-star"
                    />
                    <div>{ price }</div>
                </div>
                { this._renderGallery() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.results.selectedItem || {},
        showImages: state.product.showImages,
        currentImage: state.product.currentImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        doToggleImages: () => {
            dispatch(toggleImages());
        },
        doSelectImage: (imageIndex) => {
            dispatch(selectImage(imageIndex));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
