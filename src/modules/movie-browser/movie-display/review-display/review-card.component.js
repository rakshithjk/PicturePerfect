import React from 'react';
import {connect} from 'react-redux';
import './review-card.component.css';


class ReviewCardComponent extends React.Component {
  constructor(props) {
    super(props);
    
    
  }
  componentWillReceiveProps(nextProps){
    // If we will receive a new movieId
    console.log("####################comom", nextProps);
    //alert("dasdsad",nextProps);
  }
  render() {
    console.log("reviewcard",this.props);
    
    const {review} = this.props;
    // The CardTitle.subtitle won't render if it's null
    const ColoredLine = ({ color }) => (
      <hr
          style={{
              color: color,
              backgroundColor: color,
              height: 5
          }}
      />
  );
    console.log("qwer",review.review_id);
    return (
      
         
      <div className="main">
        <div className="fline">
          
          <h1 className="name">{review.user_name}</h1> 
          <br/>

          <h1>Rating : {review.Rating}</h1>
          
          <button className="DeleteOptions">Delete Options</button>
          
        </div>
        <h2 className="reviewtext">{review.review}</h2>
        <ColoredLine color="red" />
      </div>
      
      
      
    );
  }
}

export default connect(
  () => ({}),
  { //openMovieModal 
  }
)(ReviewCardComponent);