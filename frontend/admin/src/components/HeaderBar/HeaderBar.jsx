import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

class HeaderBar extends Component {
	constructor(props) {
		super(props);
		this._setVersion = this._setVersion.bind(this);
	}

	componentDidMount() {
		this.props.fetchFeedback(this.props.version);
	}

	getSmartClass() {
		if (this.props.version === 'smart') {
			return 'headerbar__tab--selected';
		}
		return 'headerbar__tab';
	}

	getCloneClass() {
		if (this.props.version === 'clone') {
			return 'headerbar__tab--selected';
		}
		return 'headerbar__tab';
	}

	_setVersion(version) {
		this.props.setVersion(version);
		this.props.fetchFeedback(version);
	}

    render() {
        return (
            <div className="headerbar">
                <div className={this.getSmartClass()} onClick={() => this._setVersion('smart')}>Smart</div>
                <div className={this.getCloneClass()} onClick={() => this._setVersion('clone')}>Clone</div>
            </div>
        );
    }
}

HeaderBar.propTypes = {
	version: PropTypes.string.isRequired,
	setVersion: PropTypes.func.isRequired,
	fetchFeedback: PropTypes.func.isRequired
};

export default HeaderBar;
