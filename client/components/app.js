import React from 'react';
import { connect } from 'react-redux';

import SearchResults from './searchResults';
import Search from './search';
import Spinner from './spinner';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='main-app-container'>
        <Search id="search-spinner"/>
        <div id='search-results-main-container'>
          {
            this.props.searching ? 
              <Spinner /> :
              <SearchResults />
          }
        </div>
      </div>
    )
  }
}

const mStP = state => {
  return state;
}

export default connect(mStP)(App);