import React from 'react';
import {connect} from 'react-redux';
import './review-card.component.css';


class ReviewCardComponent extends React.Component {
  state = {
    percentage: 0,
  }

  componentDidMount() {
    //this.starfunc();
  }

  
  

 

  render() {
    console.log("reviewcard", this.props);
    //this.starfunc();
    const { review } = this.props;
    // The CardTitle.subtitle won't render if it's null
    var rating = review.Rating;

    if (rating > 5) {
      rating = rating / 2;
    }
    console.log(rating);
    var starTotal = 5;

    const starPercentage = (rating / starTotal) * 100;
    const starPercentageRounded = Math.round(starPercentage / 10) * 10;
    // document.querySelector(id).style.width = starPercentageRounded;
    console.log(starPercentageRounded);


    console.log("qwer", review.review_id);
    return (
      <div className="main">
        <div className="fline">
          <h1 className="name">{review.user_name}</h1>

          <h1 className="ratingtextcard">
            Rating : 
            <div class="stars-outer">
              <div class="stars-inner"  style={{width: `${starPercentageRounded}%`}}></div>
            </div>
          </h1>

          <button className="DeleteOptions">Options</button>
        </div>

        <h2 className="reviewtext">{review.review}</h2>
        <hr />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { //openMovieModal 
  }
)(ReviewCardComponent);