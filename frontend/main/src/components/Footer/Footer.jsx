import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
                <div className="footer__content container">
                    <div className="footer__content__item">
                        <Link to="/about">
                            About this dissertation
                        </Link>
                    </div>
                    <div className="footer__content__divider"></div>
                    <div className="footer__content__item">
                        <a href="mailto:emile@kratiroff.com?Subject=Dood%20feedback" target="_top">
                            Report bug (opens email)
                        </a>
                    </div>
                    <div className="footer__content__divider"></div>
                    <div className="footer__content__item--thanks">
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
