import React from 'react';
import { connect } from 'react-redux';

import SearchResults from './searchResults';
import Search from './search';
import Spinner from './spinner';

class App extends React.Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUnMount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(evt) {
    this.welcomeText.classList.toggle('scrolled', document.body.scrollTop > 45);
  }

  render() {
    return (
      <div>
        <div id='main-app-container'>
          <div ref={el => this.welcomeText = el} id="initial-welcome-text">
            <div id='logo'>
              <span style={{color: '#00d2d3'}}>R</span>
              <span style={{color: '#11e6a3'}}>E</span>
              <span style={{color: '#42f7ff'}}>A</span>
              <span style={{color: 'rgba(54, 54, 54, 0.7)'}}>search</span>
            </div>
          </div>
          <Search id="search-spinner"/>
          <div id='search-results-main-container'>
            {
              this.props.searching ? 
                <Spinner id="main-spinner"/> :
                <SearchResults />
            }
          </div>
        </div>
      </div>
    )
  }
}

const mStP = state => {
  return state;
}

export default connect(mStP)(App);