import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
            	<div className="footer__content">
            		<div className="footer__content__item">
            			<IndexLink to="/about">About this dissertation</IndexLink>
            		</div>
            		<div className="footer__content__divider"></div>
            		<div className="footer__content__item">
            			Email me
            		</div>
            		<div className="footer__content__divider"></div>
            		<div className="footer__content__item">
            			Design by <a className="thanks" target="_blank" href="http://madeinalpha.com/">Made in Alpha</a>
            		</div>
            	</div>
            </div>
        );
    }
}

Footer.propTypes = {

};

export default Footer;
