import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__logo">
                    <div className="sidebar__logo__text">
                        <IndexLink to='/'>ML in Tourism</IndexLink>
                    </div>
                </div>
                <div className="sidebar__menu">
                    {this.props.menuItems.map(this._renderItem.bind(this))}
                </div>
                <div className="sidebar__footer">
                    <i className="fa fa-cog" aria-hidden="true"></i>
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

SideBar.propTypes = {
    currentPath: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired
};

export default SideBar;
