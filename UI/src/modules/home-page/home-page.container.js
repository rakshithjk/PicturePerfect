import { Component } from "react";
import React from 'react';
import  './home-page.container.css';
import {connect} from 'react-redux';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import {getHomeMovies,getHomeTVShows} from '../movie-browser/movie-browser.actions'
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

const HomeDisplay = (movieColumns,tvshowsColumns) => (
  
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
        {tvshowsColumns}
        <label className="more"><Link to="/tvshows-list"><h1 className="moretext">MORE</h1></Link></label>
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
        this.props.getHomeTVShows();
      }


    render(){
      const {topMoviesHome,topTVShowsHome} = this.props;
      
      const movies = movieHelpers.getMoviesList(topMoviesHome.response);
      const tvshows = movieHelpers.getMoviesList(topTVShowsHome.response);
          const movieColumns = movies ? movies.map(movie => (
      
              <MovieCard movie={movie} styles={{backgroundColor:"black"}} content={0} />
          )) : null;
        

          const tvshowsColumns = tvshows ? tvshows.map(movie => (
      
            <MovieCard movie={movie} styles={{backgroundColor:"black"}} content={1}/>
        )) : null;
        return (
            <div>       
          <Router>
                <AppBar title='Picture Perfect' position="static" style={{backgroundColor: "#a40606"}} className="appbar">
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
          {HomeDisplay(movieColumns,tvshowsColumns)}
        </Route>
        <Route  path="/movie-list"
              render={(props) => <MovieBrowser {...props} content={0} />}/>

        
            <Route  path="/tvshows-list" render={(props) => <MovieBrowser {...props} content={1} />} />
        
        <Route path="/search">
              <Search />
        </Route>

        <Route path='/movie/moviedescription/:movieid' component={MovieDisplay}/>

        <Route path='/tvshow/moviedescription/:movieid' component={MovieDisplay}/>
        
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
      topMoviesHome: state.movieBrowser.topMoviesHome,
      topTVShowsHome: state.movieBrowser.topTVShowsHome
      
    }),
    // Map action creators to properties of our component
    { getHomeMovies,getHomeTVShows }
  )(HomePage);

  //