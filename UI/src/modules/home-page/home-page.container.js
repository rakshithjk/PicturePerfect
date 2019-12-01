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
        
        return( 
          <div className='home'>
            <div className="searchdiv">
            <input type="text" className="searchbarinput" placeholder="Search..." />
            
 <svg class="search-svg-icon" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg>

            
            </div>
    <label><br/><h1 class="sectionTitle">Top Movies</h1></label> 
    <hr/>
      <div className="moviehome">
        {movieColumns}
        <Link to="/movie-list" className="more"><h1 className="moretext">MORE</h1><svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10
								S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10
								S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021
								S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10
								S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021
								S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10
								S10.558,11.011,10,11.011z"></path>
						</svg></Link>
      </div>
      <br/>
      <br/><h1 class="sectionTitle">TV Shows</h1>
      <hr/>
      <div className="moviehome">
        {tvshowsColumns}
        <Link to="/tvshows-list" className="more"><h1 className="moretext">MORE </h1><svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10
								S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10
								S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021
								S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10
								S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021
								S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10
								S10.558,11.011,10,11.011z"></path>
						</svg></Link>
      </div>
      <br/>
      <br/><h1 class="sectionTitle">Documentaries</h1>
      <hr/>
      <div className="moviehome">
        {movieColumns}
        ><Link to="/movie-list" className="more"><h1 className="moretext">MORE</h1><svg className="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M3.936,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021S5.957,11.116,5.957,10
								S5.052,7.979,3.936,7.979z M3.936,11.011c-0.558,0-1.011-0.452-1.011-1.011s0.453-1.011,1.011-1.011S4.946,9.441,4.946,10
								S4.494,11.011,3.936,11.011z M16.064,7.979c-1.116,0-2.021,0.905-2.021,2.021s0.905,2.021,2.021,2.021s2.021-0.905,2.021-2.021
								S17.181,7.979,16.064,7.979z M16.064,11.011c-0.559,0-1.011-0.452-1.011-1.011s0.452-1.011,1.011-1.011S17.075,9.441,17.075,10
								S16.623,11.011,16.064,11.011z M10,7.979c-1.116,0-2.021,0.905-2.021,2.021S8.884,12.021,10,12.021s2.021-0.905,2.021-2.021
								S11.116,7.979,10,7.979z M10,11.011c-0.558,0-1.011-0.452-1.011-1.011S9.442,8.989,10,8.989S11.011,9.441,11.011,10
								S10.558,11.011,10,11.011z"></path>
						</svg></Link>
      </div>

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

  ////match.params