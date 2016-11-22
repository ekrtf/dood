import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { toggleImages, selectImage } from '../../actions/product.actions';

class Product extends Component {
    constructor(props) {
        super(props);
        this._openLightbox = this._openLightbox.bind(this);
        this._goToPrevious = this._goToPrevious.bind(this);
        this._goToNext = this._goToNext.bind(this);
        this._onClose = this._onClose.bind(this);
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

		const gallery = images.map((obj, i) => {
			return (
				<a key={i} onClick={(e) => this._openLightbox(i, e)}>
					<img className="product__gallery__image" src={obj.src} />
				</a>
			);
		});

		return (
			<div className="product__gallery">
				{gallery}
			</div>
		);
    }

    render() {
        const { name } = this.props.product;

        return (
            <div className="product">
                { name }
                { this._renderGallery() }
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
