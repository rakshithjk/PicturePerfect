import React from 'react';
import {Row, Col} from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card.component';
import LoaderComponent from '../../common/loader.component';

const styles = {
  movieColumn: {
    marginBottom: 50
  }
}


const MovieListComponent = ({movies, isLoading}) => {
  console.log("mosss",movies);
  const movieColumns = movies ? movies.map(movie => (
    
      <MovieCard movie={movie} styles={{backgroundColor:"black"}} />
  )) : null;  
  
  return (
    <Row>
      {movieColumns}
      <LoaderComponent isLoading={isLoading} />
    </Row>
  );
}

export default MovieListComponent;