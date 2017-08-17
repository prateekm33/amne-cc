import React from 'react';
import { connect } from 'react-redux';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import config from '../../config/config.json';

const googleMapURL=`${config.apis.google.maps}?v=3.27&libraries=places,geometry&key=${config.apis.google.key}`;


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapCenter : this.getMapCenter(props),
      markers : [...this.parseInputAddressLocations(), ...props.markers]
    };
  }

  parseInputAddressLocations() {
    const first = this.props.inputAddresses[0].split(',');
    const second = this.props.inputAddresses[1].split(',');
    return [
      {
        geometry : {
          location : { lat : +first[0], lng : +first[1] },
        },
        name : 'Location 1',
        red : true
      },
      {
        geometry : {
          location : { lat : +second[0], lng : +second[1]},
        },
        name : 'Location 2',
        red : true
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ mapCenter : this.getMapCenter(nextProps) });
  }

  getMapCenter(props) {
    const addresses = props.inputAddresses;
    const first = addresses[0].split(',');
    const second = addresses[1].split(',');

    const latDiff = +(first[0] - second[0]) / 2;
    const lngDiff = +(first[1] - second[1]) / 2;
    const latMid = +(latDiff < 0 ? second[0] : first[0]) + latDiff;
    const lngMid = +(lngDiff < 0 ? second[1] : first[1]) + lngDiff;
    return {
      lat : latMid,
      lng : lngMid
    }
  }

  render() {
    const GoogleMapWrapped = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={10}
        defaultCenter={{ lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng }}
        // Pass the map reference here as props
        googleMapURL={googleMapURL}
        onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) => {
          const parsedMarker = {
            position : marker.geometry.location,
            key : marker.name,
            icon : marker.red ? '' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            defaultAnimation : 2
          }
          return (<Marker
            {...parsedMarker}
            onRightClick={() => props.onMarkerRightClick(index)} />
          )
        })}
      </GoogleMap>
    ))
    return <GoogleMapWrapped 
            containerElement={
              <div style={{ height: `100%`, width: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%`, width: `100%` }} />
            }
            markers={this.state.markers} />
  }
}

const mStP = state => {
  return {
    inputAddresses : state.inputAddresses,

  }
}

export default connect(mStP)(Map);