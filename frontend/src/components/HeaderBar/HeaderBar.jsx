import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
    render() {
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <div className="headerbar__logo__text">
                        <IndexLink to='/'>ML in Tourism</IndexLink>
                    </div>
                </div>
            </div>
        );
    }

    _renderItem(item) {
        return (
            <IndexLink to={item.route} key={item.id}>
                <div className={this.props.currentPath === item.route ? 'mi--selected' : 'mi'}>
                    <div className="mi__name">{item.label}</div>
                </div>
            </IndexLink>
        );
    }
}

HeaderBar.propTypes = {
    currentPath: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired
};

export default HeaderBar;
