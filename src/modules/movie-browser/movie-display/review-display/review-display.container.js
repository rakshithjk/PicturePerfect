import React from 'react';
import LoaderComponent from '../../../common/loader.component';
import {Row, Col} from 'react-bootstrap';
import ReviewCard from './review-card.component';
import './review-display.container.css';
const ReviewList = ({reviews}) => {
    console.log("mosss",reviews);
    //console.log("mosss",reviews.results);
    const reviewColumns = reviews ? reviews.map(review => (
      
        <ReviewCard review={review} styles={{backgroundColor:"black"},{padding:"5px"}} />
        
    )) : null;  
    
    return (
      <div className="display">
      
        {reviewColumns}
        
      
      </div>
    );
  }
  
  export default ReviewList;