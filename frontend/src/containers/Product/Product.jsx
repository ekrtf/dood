import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import Spinner from 'react-spinner';
import Rating from 'react-rating';
import { Link } from 'react-router';
import { toggleImages, selectImage, setChosenProduct } from '../../actions/product.actions';
import { Map } from '../../components';
import { selectItem } from '../../actions/results.actions';

class Product extends Component {
    constructor(props) {
        super(props);

        this.doSelectProduct = this.doSelectProduct.bind(this);

        this.onBackClick = this.onBackClick.bind(this);
        this.openGallery = this.openGallery.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentWillMount() {
        // fetch product if user navigates directly to this page
        if (_.isEmpty(this.props.product) && !this.props.isFetching) {
            this.props.fetchProduct(this.props.routeParams.resultId);
        }
    }

    onBackClick() {
        this.props.history.push('/' + this.props.version);
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
                            &mdash; {item.author}
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
        const isFetching = this.props.isFetching;
        const { name, price, rating, coordinates, addressDisplay } = this.props.product;

        let position = [ 0, 0 ];
        if (_.isObject(coordinates)) {
            position = [ coordinates.latitude, coordinates.longitude ];
        }

        return (
            <div className="container product">

                <div className="product__back" onClick={(e) => this.onBackClick(e)}>
                    <i className="em em-back"></i>
                    <div>Back to results</div>
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


                { isFetching &&
                    <div className="product__gallery--placeholder">
                        <div className="product__spinner"><Spinner /></div>
                    </div>
                }
                { !isFetching && Array.isArray(this.props.product.images) &&
                    this._renderGallery() }

                <div className="product__reviews">
                    <h4 className="product__heading">Reviews</h4>
                    { isFetching && (<div className="product__spinner"><Spinner /></div>) }
                    { !isFetching && _.isArray(this.props.product.reviews) && this._renderReviews() }
                </div>

                <div className="product__map">
                    <h4 className="product__heading">Location</h4>
                    <div className="product__map__location">
                        { addressDisplay && <div>{addressDisplay}</div> }
                    </div>

                    <Map coords={position} />
                    
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.results.isFetching,
        product: state.results.selectedItem || {}, // HACK
        showImages: state.product.showImages,
        currentImage: state.product.currentImage,
        version: state.results.version
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
        },
        fetchProduct: (resultId) => {
            dispatch(selectItem(resultId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
