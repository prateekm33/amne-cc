import React from 'react';
import classnames from 'classnames';
import * as utils from '../../utils/clientUtils';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ratingString = this.props.data.rating ? 
        `${this.props.data.rating} / 5` :
        "No rating data currently available"
    
    const ratingClasses = classnames({
      "result-rating" : this.props.data.rating,
      "no-rating" : !this.props.data.rating
    });

    const score = utils.convertMetersToMiles(this.props.data.score);

    return (
      <div className="search-result-container">
        <div className="search-result-meta">
          <div className="result-name">{this.props.data.name}</div>
          <div className={ratingClasses}> {ratingString} </div> 
        </div>
        <div className="line-2">
          <div className="distance-score">Distance score : {score} mi </div>
          <div className="distance-hover">This is the total # of mi between each of the two addresses and this REA</div>
          <button className="show-more secondary">Click for more details</button>
        </div>
      </div>
    )
  }
}