import React, { Component } from 'react';
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
                        <IndexLink to="landing">About</IndexLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBar;
