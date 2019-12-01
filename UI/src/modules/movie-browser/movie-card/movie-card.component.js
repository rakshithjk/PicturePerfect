import React from 'react';
import {connect} from 'react-redux';
import {Card, CardTitle, CardMedia} from 'material-ui';
//import {openMovieModal} from '../movie-modal/movie-modal.actions';
import MovieDisplay from '../movie-display/movie-display.container'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Link
} from "react-router-dom";
import { black } from 'material-ui/styles/colors';

// These are inline styles
// You can pass styles as objects using this convention
const styles = {
  cardMedia: {
    maxHeight: 394,
    overflow: 'hidden',
    padding: "10px"
  },
  card: {
    cursor: 'pointer',
    height: 400,
    backgroundColor : "black",
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%'
  }
};

class MovieCardComponent extends React.Component {
  constructor(props) {
    super(props);
    // Track if the mouse hovering over the movie card
    this.state = {
      isMouseOver: false
    };
  }
  componentWillReceiveProps(nextProps){
    // If we will receive a new movieId
    console.log("####################comom", nextProps);
    //alert("dasdsad",nextProps);
  }

  getcontent(){
    if(this.props.content == 0){
      return ("/movie");
    }
    else {
      return ("/tvshow")
    }
  }
  render() {
    console.log("moviecard",this.props);
    
    const {movie, openMovieModal} = this.props;
    // The CardTitle.subtitle won't render if it's null
    const subtitle = this.state.isMouseOver ? movie.genre_ids : null;
    const url = this.getcontent();
    console.log("qwer",movie.title);
    return (
      
         <NavLink to={{pathname:url+`/moviedescription/${movie.id}`,state:{movie:{movie}} }} activeClassName="description">
      <Card
        style={styles.card}
        onMouseOver={() => this.setState({isMouseOver: true})}
        onMouseLeave={() => this.setState({isMouseOver: false})}
        //onClick= {() => openMovieModal(movie.id)}
      >
        <CardMedia
          style={styles.cardMedia}
          overlay={
            <CardTitle
              title={movie.title} 
              subtitle={subtitle} 
            />
          }
        >
          <img style={styles.bgImage} src={movie.poster_path} />
        </CardMedia>
      </Card>
      </NavLink>
      
      
    );
  }
}

export default connect(
  () => ({}),
  { //openMovieModal 
  }
)(MovieCardComponent);