import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
    render() {
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <div className="headerbar__logo__text">
                        <IndexLink to="/">Dissertation</IndexLink>
                    </div>
                </div>
                <div className="headerbar__menu">
                    <div className="headerbar__menu__item">
                        <IndexLink to="/clone">Clone</IndexLink>
                    </div>
                    <div className="headerbar__menu__item">
                        <IndexLink to="/ml">ML</IndexLink>
                    </div>
                </div>
            </div>
        );
    }
}

HeaderBar.propTypes = {
};

export default HeaderBar;
