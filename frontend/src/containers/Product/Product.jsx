import React, { Component } from 'react';
import L from 'leaflet';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import Rating from 'react-rating';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router';
import { toggleImages, selectImage, setChosenProduct } from '../../actions/product.actions';
import _ from 'lodash';

import iconUrl from '../../resources/images/marker-icon.png';
import shadowUrl from '../../resources/images/marker-shadow.png';
const icon = L.icon({ iconUrl, shadowUrl });

class Product extends Component {
    constructor(props) {
        super(props);

        this.doSelectProduct = this.doSelectProduct.bind(this);

        this.openGallery = this.openGallery.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.refs.map.leafletElement.scrollWheelZoom.disable();
    }

    doSelectProduct() {
        this.props.setChosenProduct(this.props.product);
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

    openGallery(index, e) {
        e.preventDefault();
        this.props.doToggleImages();
        this.props.doSelectImage(index);
    }

    _renderCategories() {
        const categories = this.props.product.categories.map(c => c.title);
        if (!Array.isArray(categories)) return;

        const tags = categories.map((item, index) => {
            return (<div key={index} className="product__info__categories__item">{item}</div>);
        });
        return (<div className="product__info__categories">{ tags }</div>);
    }

    _renderReviews() {
        const reviews = this.props.product.reviews;
        if (!Array.isArray(reviews)) return; // some places don't have reviews

        const conversation = reviews.map((item, index) => {
            return (
                <div key={index} className="product__reviews__group__item">
                    <div className="product__reviews__group__item__quote">{'"'}</div>
                    <div className="product__reviews__group__item__text">
                        {item.text + '"'}
                    </div>
                    <div className="product__reviews__group__item__userandmore">
                        <div className="product__reviews__group__item__userandmore__user">
                            &mdash; {item.user.name}
                        </div>
                        <div className="product__reviews__group__item__userandmore__more">
                            {item.text.includes('...') &&
                                <a href={item.url}
                                   target="blank"
                                   className="product__reviews__group__item__more"
                                >
                                    Read more
                                </a>
                            }
                        </div>
                    </div>
                </div>
            );
        });
        return (<div className="product__reviews__wrapper">{ conversation }</div>);
    }

    _renderGallery() {
        const images = this.props.product.images;
        if (!Array.isArray(images)) return;

		const gallery = images.map((item, index) => {
			return (
				<a key={index} onClick={(e) => this.openGallery(index, e)}>
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
        const backLink = '/' + this.props.version;
        const { name, price, rating, coordinates, location } = this.props.product;

        let position = [ 0, 0 ];
        if (_.isObject(coordinates)) {
            position = [ coordinates.latitude, coordinates.longitude ];
        }

        return (
            <div className="product container">

                <div className="product__back">
                    <i className="em em-back"></i>
                    <Link to={backLink}>
                        <div>Back to results</div>
                    </Link>
                </div>

                <div className="product__top">
                    <div className="product__top__nameandrating">
                        <h3 className="product__top__nameandrating__name">{ name }</h3>
                        <div className="product__top__nameandrating__rating">
                            <Rating
                                start={0}
                                stop={5}
                                readonly={true}
                                initialRate={rating}
                                empty="glyphicon glyphicon-star-empty"
                                full="glyphicon glyphicon-star"
                            />
                        </div>
                    </div>
                    <div className="product__top__buttonbox">
                        <Link to="/feedback">
                            <button onClick={this.doSelectProduct}>
                                I choose this one
                                <i className="em em---1"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="product__info">
                    <div>{ _.isArray(this.props.product.categories) && this._renderCategories() }</div>
                    <div className="product__info__price">
                        <div>{ price }</div>
                    </div>
                </div>

                { _.isArray(this.props.product.images) && this._renderGallery() }

                <div className="product__reviews">
                    <h4 className="product__heading">Reviews</h4>
                    { _.isArray(this.props.product.reviews) && this._renderReviews() }
                </div>

                <div className="product__map">
                    <h4 className="product__heading">Location</h4>
                    <div className="product__map__location">
                        { location &&
                            <div>
                                <span>{location.address1},&ensp;</span>
                                <span>{location.city},&ensp;</span>
                                <span>{location.country}</span>
                            </div>
                        }
                    </div>
                    <Map ref="map" center={position} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={position} icon={icon}>
                            <Popup>
                                <span>{name}</span>
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
        product: state.results.selectedItem || {}, // HACK
        showImages: state.product.showImages,
        currentImage: state.product.currentImage,
        version: state.search.version
    };
}

function mapDispatchToProps(dispatch) {
    return {
        doToggleImages: () => {
            dispatch(toggleImages());
        },
        doSelectImage: (imageIndex) => {
            dispatch(selectImage(imageIndex));
        },
        setChosenProduct: (product) => {
            dispatch(setChosenProduct(product));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
