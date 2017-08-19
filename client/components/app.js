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
            <div>Go ahead and search for some REAs!</div>
          </div>
          <Search id="search-spinner"/>
          <div id='search-results-main-container'>
            {
              this.props.searching ? 
                <Spinner /> :
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