import React, { Component } from 'react';
import "./movie-display.container.css"
import * as movieActions from '../movie-browser.actions';
import {connect} from 'react-redux';
import LoaderComponent from '../../common/loader.component';
import ReviewList from './review-display/review-display.container.js'
import * as scrollHelpers from '../../common/scroll.helpers'
import MovieShows from '../movie-shows/movie-shows.display'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const styles = {
  // Can use functions to dynamically build our CSS
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl}) `,    
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 400,
    color: 'white',
    padding: 10,
    flexGrow: 8,
  }),
 
}

function check (moviesResponse){
  return !!moviesResponse ? ([
    ...moviesResponse.results]) : null;
}

class MovieDisplay extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      currentPage: 1,
      sortState: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.props.getMovieReviews(this.props.location.state.movie.movie.id, this.state.sortState);
  }

  handleDropdownChange(e) {
    
    if(e.target.value == "id_asc"){
      this.id_asc();
    }
    if(e.target.value == "rd_asc"){
      this.rd_asc();
    }

    if(e.target.value == "tt_asc"){
      this.tt_asc();
    }
  }

  handleScroll() {
    //console.log(this);
    //console.log(this.state);
    //console.log(this.props);
    //console.log(this.props.topMovies);
    //console.log(this.props.topMovies.response)
    //const {topMovies} = this.props;                                            
    if (!this.props.topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage,this.state.sortState);
        this.setState({currentPage: nextPage});
      }
    }
  }

  async id_asc() {
    //alert("clicked");
    await this.setState({sortState: 1});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getMovieReviews(this.props.location.state.movie.movie.id, this.state.sortState);
  }


  async rd_asc() {
    //alert("clicked");
    await this.setState({sortState: 2});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getMovieReviews(this.props.location.state.movie.movie.id, this.state.sortState);
  }
  
  async tt_asc() {
    //alert("clicked");
    await this.setState({sortState: 3});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getMovieReviews(this.props.location.state.movie.movie.id, this.state.sortState);
  }

  

    render() {
      //console.log(this.props);
      const {movie} = this.props.location.state.movie;

      const reviews = check(this.props.reviews.response);
      console.log("123",reviews);
      return (
        <div>
        <div >
            <div style={styles.dialogContent(movie.background_path)} className="innerMain">
                
                < div className="poster">
                  <img  src={movie.poster_path} />
                </div>
                       
                <div className="title">
                  <h1 className="text1">{movie.title}</h1>
                  <div className="info">
                  <h2 className="rating">Rating {movie.vote_average}</h2>
                  <h2 className="release">Release Date {movie.release_date}</h2>
                  </div>
                  <h2>Summary - </h2>
                  <h3>{movie.overview}</h3>
                </div>

           
                
            </div>

            
        </div>
        <div className="choicebuttons">
          <button className="shows"> <Link to="/shows">SHOWS</Link></button> 
          <Switch>
            <Route path="/shows">
              <MovieShows/>
            </Route>
          </Switch>
          <button className="addreview"> ADD Review</button>
        </div>
        <div className="reviewContainer">

        <div className="filters">
                <h3 className="text"> Filters</h3>
                <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                <option disabled selected value> -- Select a filter -- </option>
                  <option value="id_asc">Sort by Id ascending</option>
                  <option value="rd_asc">Sort by Date ascending</option>
                  <option value="tt_asc">Sort by Rating descending</option>
                </select>
              </div>
          
        <ReviewList reviews = {reviews}/>
          
      </div>
      
      </div>
      );
    }
  }
  
  export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
      reviews: state.movieBrowser.topReviews
      
    }),
    // Map action creators to properties of our component
    { ...movieActions }

  )(MovieDisplay);