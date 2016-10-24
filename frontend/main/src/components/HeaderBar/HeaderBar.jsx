import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
    render() {
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <IndexLink to="/">Dissertation</IndexLink>
                </div>
                <div className="headerbar__beta">(beta)</div>
            </div>
        );
    }
}

HeaderBar.propTypes = {
};

export default HeaderBar;
