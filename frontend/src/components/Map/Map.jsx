import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

const key = 'AIzaSyDqG4iWfxl1E2VAUK-0anXvxO_GcoBEQSU';

class Map extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const lat = this.props.coords[0];
        const lng = this.props.coords[1];
        return (
            <div className="map">
                <iframe src={`https://www.google.com/maps/embed/v1/place?q=${lat},${lng}
                  &zoom=16
                  &key=AIzaSyDqG4iWfxl1E2VAUK-0anXvxO_GcoBEQSU`}
                  className="map__iframe"
                >
              </iframe>
            </div>
        );
    }
}

Map.propTypes = {
    coords: PropTypes.array.isRequired
};

export default Map;
