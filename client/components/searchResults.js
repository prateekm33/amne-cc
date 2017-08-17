import React from 'react';
import { connect } from 'react-redux';

import SearchResult from './searchResult';
import Map from './map';

class SearchResults extends React.Component {
  constructor() {
    super()
  }

  renderSearchResultsDisplay() {
    return (
      <div id='search-results-display'>
        <div id='left-col'>
          { this.renderSearchResults() }
        </div>
        <div id='right-col'>
          <Map markers={this.props.data}/>
        </div>
      </div>
    )
  }

  renderSearchResults() {
    return this.props.data.map(
      (i, idx) => <SearchResult data={i} key={`${i.key}-${idx}`}/>
    );
  }

  renderNoDataDisplay() {
    return (
      <div>
        Go ahead and search for some REAs!
      </div>
    )
  }

  render() {
    return (
      <div id='search-results-container'>
        { 
          this.props.data.length ? 
            this.renderSearchResultsDisplay() :
            this.renderNoDataDisplay()
        }
      </div>
    )
  }
}


const mStP = state => {
  return {
    data : state.searchResults
  }
}

export default connect(mStP)(SearchResults);