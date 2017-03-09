import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
                <div className="footer__content container">
                    <div className="footer__content__item">
                        <IndexLink to="/about">About this dissertation</IndexLink>
                    </div>
                    <div className="footer__content__divider"></div>
                    <div className="footer__content__item">
                        Say hi or report bug
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
    screen: PropTypes.object.isRequired
};

export default Footer;
