import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actions from '../../redux/actions';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      error : false,
      displayMessage : false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissMsg = this.dismissMsg.bind(this);


  }

  componentDidMount() {
    this.inputs = Array.prototype.slice.call(this.formEl.querySelectorAll('input'));
    const autocompletes = this.inputs.map(i => new google.maps.places.Autocomplete(i));
    this.geocoder = new google.maps.Geocoder();
  }

  formValidated() {
    const inputs = this.inputs;
    const length = inputs.length;
    for (let i = 0; i < length; i++) {
      if (!inputs[i].value) return false;
    }

    return true;
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.formValidated()) {
      return this.setState({
        displayMessage : true,
        error : true
      });
    }

    // if the form has been validated, then dispatch the call to make the query
    const addresses = this.getAddresses();
    Promise.all(addresses).then(locations => {
      this.props.dispatch(actions.fetchSearchResults(locations, /*can specify a radius here as the second argument if needed*/))
        .then(results => {
          this.props.dispatch(actions.searching(false));
        });
    }).catch(err => {
      console.warn('[ERROR] Geocoding address did not work : ', )
    });
  }

  getAddresses() {
    return this.inputs.map(i => {
      return new Promise((resolve, reject) => {
        return this.geocoder.geocode({ address : i.value }, (res, status) => {
          if (status !== 'OK') {
            return reject({
              msg : 'Was not able to properly geocode the given address',
              address : i.value
            });
          }
          resolve(`${res[0].geometry.location.lat()},${res[0].geometry.location.lng()}`);
        });
      });
    });
  }

  dismissMsg() {
    this.setState({
      displayMessage : false,
      error : false
    });
  }

  render() {
    return (
      <div id='search-container'>
        {
          this.state.displayMessage ?
            <UserMessages 
              onClick={this.dismissMsg} 
              error={this.state.error} /> 
            : null
        }
        <form ref={el => this.formEl = el} onSubmit={this.handleSubmit}>
          <input placeholder="Address 1"/>
          <input placeholder="Address 2"/>
          <button id="search" className="primary" type="submit" value="">Search</button>
        </form>
      </div>
    )
  }
}


const mStP = state => {
  return {
    searching : state.searching
  }
}

export default connect(mStP)(Search);




const messages = {
  ERROR : 'Please make sure that you have filled out the form correctly. There should be two addresses provided.',
  SUCCESS : "Got it! Now sit back and relax as we do the work for you."
};


function UserMessages(props) {
  const classNames = {
    error : props.error
  };

  const msg = props.error ? messages.ERROR : messages.SUCCESS;

  return (
    <div onClick={props.onClick}>
      <div className={classNames}>{msg}</div>
    </div>
  )
}