import React from 'react';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-result-container">
        <div className="result-name">{this.props.data.name}</div>
        <div className="result-rating">{this.props.data.rating}/5</div>
      </div>
    )
  }
}