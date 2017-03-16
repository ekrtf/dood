import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Button } from 'react-bootstrap';

class HeaderBar extends Component {
	constructor(props) {
		super(props);
		this._setVersion = this._setVersion.bind(this);
	}

	_setVersion(version) {
		this.props.setVersion(version);
		this.props.fetchFeedback(version);
	}

    render() {
        return (
            <div className="headerbar">
                <div className="headerbar__logo">
                    <div onClick={() => this._setVersion('smart')}>Smart</div>
                    <div onClick={() => this._setVersion('clone')}>Clone</div>
                </div>
            </div>
        );
    }
}

HeaderBar.propTypes = {
	setVersion: PropTypes.func.isRequired,
	fetchFeedback: PropTypes.func.isRequired
};

export default HeaderBar;
