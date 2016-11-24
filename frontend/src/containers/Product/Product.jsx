import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { toggleImages, selectImage } from '../../actions/product.actions';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Rating from 'react-rating';

class Product extends Component {
    constructor(props) {
        super(props);

        this.doSelectProduct = this.doSelectProduct.bind(this);
        this.doAddProductToList = this.doAddProductToList.bind(this);

        this.openLightbox = this.openLightbox.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    doSelectProduct() {
        // TODO
    }

    doAddProductToList() {
        // TODO
    }

    goToPrevious() {
        const newIndex = this.props.currentImage - 1;
        this.props.doSelectImage(newIndex);
    }

    goToNext() {
        const newIndex = this.props.currentImage + 1;
        this.props.doSelectImage(newIndex);
    }

    onClose() {
        this.props.doToggleImages();
    }

    openLightbox(index, e) {
        e.preventDefault();
        this.props.doToggleImages();
        this.props.doSelectImage(index);
    }

    _renderCategories() {
        const categories = this.props.product.categories.map(c => c.title);
        const tags = categories.map((item, index) => {
            return (<div key={index} className="product__categories__item">{item}</div>);
        });
        return (<div className="product__categories">{ tags }</div>);
    }

    _renderReviews() {
        const reviews = this.props.product.reviews;
        const conversation = reviews.map((item, index) => {
            // <img className="product__reviews__item__user__img" src={item.user.image_url} />
            return (
                <div key={index} className="product__reviews__item">
                    <blockquote>
                        "{item.text}"
                        {item.text.includes('...') && <a href={item.url} target="blank">Read more</a>}
                    </blockquote>
                    <div className="product__reviews__item__user">
                        {item.user.name}
                    </div>
                </div>
            );
        });
        return (<div className="product__reviews">{ conversation }</div>);
    }

    _renderGallery() {
        const images = this.props.product.images;
        if (!images) return;

		const gallery = images.map((item, index) => {
			return (
				<a key={index} onClick={(e) => this.openLightbox(index, e)}>
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
                    onClickPrev={this.goToPrevious}
                    onClickNext={this.goToNext}
                    onClose={this.onClose}
                    enableKeyboardInput={true}
                    showThumbnails={true}
                />
            </div>
		);
    }

    render() {
        const { name, price, rating } = this.props.product;
        const position = [ this.props.product.coordinates.latitude, this.props.product.coordinates.longitude ];

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
                </div>
                <div className="product__info--price">
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
                { this._renderReviews() }
                <div className="product__map">
                    <Map center={position} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={position}>
                            <Popup>
                                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                            </Popup>
                        </Marker>
                    </Map>
                </div>
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
