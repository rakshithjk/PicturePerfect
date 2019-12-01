import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ShowCard from './show-card.component';
const ShowList = ({shows}) => {
    console.log("mosss",shows);
    //console.log("mosss",reviews.results);
    const showColumns = shows ? shows.map(show => (
      
        <ShowCard show={show} styles={{backgroundColor:"black"},{padding:"5px"}}  />
        
    )) : null;  
    
    return (
      <div className="display">
      
        {showColumns}
        
      
      </div>
    );
  }
  
  export default ShowList;