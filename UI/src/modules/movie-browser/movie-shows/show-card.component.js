import React from 'react';
import {connect} from 'react-redux';
import './show-card.component.css';


class ShowCardComponent extends React.Component {
  state = {
    percentage: 0,
  }

  componentDidMount() {
  }

  
  

 

  render() {
    const { show } = this.props;
    return (


      <div className="main">
       time - {show.Time}
       
       city- {show.city} 
       venue -{show.venue} 

           
        <hr />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { //openMovieModal 
  }
)(ShowCardComponent);