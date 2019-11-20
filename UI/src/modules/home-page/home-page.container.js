import { Component } from "react";
import React from 'react';
import  './home-page.container.css';
import {connect} from 'react-redux';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import {getHomeMovies} from '../movie-browser/movie-browser.actions'
import * as movieHelpers from '../movie-browser/movie-browser.helpers'
import {Container, Row, Col, Button} from 'react-bootstrap';
import MovieList from '../movie-browser/movie-list/movie-list.component'
import MovieCard from '../movie-browser/movie-card/movie-card.component'
import MovieBrowser from '../movie-browser/movie-browser.container'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Search from '../movie-browser/movie-search/movie-search.container'
import MovieDisplay from '../movie-browser/movie-display/movie-display.container'
import MovieShows from '../movie-browser/movie-shows/movie-shows.display'
import AddNew from '../movie-browser/add-new/add-new.component'
const HomeDisplay = (movieColumns) => (
  
  <div className="home">
    
    <label><br/><h1 class="sectionTitle">Top Movies</h1></label> 
    <hr/>
      <div className="moviehome">
        {movieColumns}
        <label className="more"><Link to="/movie-list"><h1 className="moretext">MORE</h1></Link></label>
      </div>
      <br/>
      <br/><h1 class="sectionTitle">TV Shows</h1>
      <hr/>
      <div className="moviehome">
        {movieColumns}
        <label className="more"><Link to="/movie-list"><h1 className="moretext">MORE</h1></Link></label>
      </div>
      <br/>
      <br/><h1 class="sectionTitle">Documentaries</h1>
      <hr/>
      <div className="moviehome">
        {movieColumns}
        <label className="more"><Link to="/movie-list"><h1 className="moretext">MORE</h1></Link></label>
      </div>

  </div>
    
    )
  

class HomePage extends React.Component{


    componentDidMount() {
        
        this.props.getHomeMovies();
      }


    render(){
      const {topMoviesHome} = this.props;
      const movies = movieHelpers.getMoviesList(topMoviesHome.response);
          const movieColumns = movies ? movies.map(movie => (
      
              <MovieCard movie={movie} styles={{backgroundColor:"black"}} />
          )) : null;
        
        return (
            <div>       
          <Router>
                <AppBar title='Picture Perfect' style={{backgroundColor: "blue"}} >
        <div className="appbarbtn">
          <Link to="/">
        
          <Button className="homebtn" >
            Home
          </Button >
          </Link>

        <Link to="/search" >
          <Button className="searchbtn">
            Search
          </Button >
        </Link>
          
        <Link to="/movie-list">
            <Button className="moviebtn"> 
            Movie-List
            </Button>
        </Link>
        </div>
        </AppBar>

        <Switch>
        <Route exact path='/'>
          {HomeDisplay(movieColumns)}
        </Route>
        <Route path="/movie-list" >
            <MovieBrowser content={0}/>
        </Route>

        
        <Route path="/search">
              <Search />
        </Route>

        <Route path='/moviedescription/:movieid' component={MovieDisplay}/>
        
        <Route path="/addnew">
                <AddNew/>
            </Route>
        
        <Route path="/shows"  render={(props) => <MovieShows  />}/>
    </Switch>

    

    
    
          


    
    </Router>    
     </div>

        )
    }
}

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
      topMoviesHome: state.movieBrowser.topMoviesHome
      
    }),
    // Map action creators to properties of our component
    { getHomeMovies }
  )(HomePage);

  //