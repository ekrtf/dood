import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
    render() {
        const { handleChangeVersion } = this.props;
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <div className="headerbar__logo__text">
                        <IndexLink to="/">Dissertation</IndexLink>
                    </div>
                </div>
                <div className="headerbar__menu">
                    <div className="headerbar__menu__item">
                        <IndexLink to="about">About</IndexLink>
                    </div>
                    <div className="headerbar__menu__item">
                        <IndexLink to="clone" onClick={(e) => handleChangeVersion(e)}>Clone</IndexLink>
                    </div>
                    <div className="headerbar__menu__item">
                        <IndexLink to="ml" onClick={(e) => handleChangeVersion(e)}>ML</IndexLink>
                    </div>
                </div>
            </div>
        );
    }
}

HeaderBar.propTypes = {
    handleChangeVersion: PropTypes.func.isRequired
};

export default HeaderBar;
