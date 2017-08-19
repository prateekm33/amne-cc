import React from 'react';
import classnames from 'classnames';
import * as utils from '../../utils/clientUtils';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.clickForMoreDetails = this.clickForMoreDetails.bind(this);
    this.funFacts = [
      "Fun fact 1: Some elevators have 'Close door' buttons that aren't actually hooked up to anything. It's either a mind trick or that feature is yet to come...",
      "Fun fact 2: A chocolate bar is the reason that we have the microwave. To this day, scholars have been struggling to answer the most-asked question : Was it a Mars Bar?",
      "Fun fact 3: Because stars, like our Sun, can live and die, barns are painted red.",
      "Fun fact 4: If you click for more details again, you will have learned at least 5 fun facts. Which one are you on now?",
      "Fun fact 5: Told you so...Also this is most likely the end.",
      "Fun fact 6: James Franco painted most of the paintings seen hanging in the background in, you guessed it, 'This is the End'."
    ];
    this.funFactPointer = 0;
  }

  clickForMoreDetails() {
    console.log(this.funFacts[this.funFactPointer++]);
    this.funFactPointer = this.funFactPointer === this.funFacts.length ? 0 : this.funFactPointer;
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
          <div className="result-address">{this.props.data.vicinity}</div>
          <div className={ratingClasses}> {ratingString} </div> 
        </div>
        <div className="line-2">
          <div className="distance-score">Distance score : {score} mi </div>
          <div className="distance-hover">This is the total # of mi between each of the two addresses and this REA</div>
          <button onClick={this.clickForMoreDetails} className="show-more secondary">Click for more details</button>
        </div>
      </div>
    )
  }
}