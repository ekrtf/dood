import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
    render() {
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <div className="headerbar__logo__text">
                        <IndexLink to="/">ML in Tourism</IndexLink>
                    </div>
                </div>
                <div className="headerbar__menu">
                    <div className="headerbar__menu__item">
                        <IndexLink to="/">Landing</IndexLink>
                    </div>
                    <div className="headerbar__menu__item">
                        <IndexLink to="/search">Search</IndexLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBar;
