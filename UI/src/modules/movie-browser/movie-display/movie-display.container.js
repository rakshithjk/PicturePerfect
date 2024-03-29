import React, { Component } from 'react';
import "./movie-display.container.css"
import * as movieActions from '../movie-browser.actions';
import {connect} from 'react-redux';
import LoaderComponent from '../../common/loader.component';
import ReviewList from './review-display/review-display.container.js'
import MovieShows from '../movie-shows/movie-shows.display'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Popup from "./add-review/add-review.component"
import { qualifiedTypeIdentifier } from '@babel/types';



const styles = {
  
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl}) `,    
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: 400,
    color: 'white',
    padding: 10,
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
    this.state = { showPopup: false };  
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  

  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.setState({currentPage: 1});
    this.setState({sortState: 0});
    this.getdata();
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
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  async id_asc() {
    //alert("clicked");
    await this.setState({sortState: 1});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }

  async prev() {
    //alert(this);
    if(this.state.currentPage>1){
    const pg = (this.state.currentPage-1)>1?(this.state.currentPage-1):1;
    //alert(pg);
    await this.setState({currentPage: pg}) ;
    this.getdata();
    }
    else{
      alert("This is the first page")
    }
  }

  async next() {
    //alert(this);
    const pg = (this.state.currentPage+1);
    //alert(pg);
    await this.setState({currentPage: pg}) ;
    this.getdata();
  }

  async rd_asc() {
    //alert("clicked");
    await this.setState({sortState: 2});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }
  
  async tt_asc() {
    //alert("clicked");
    await this.setState({sortState: 3});
    this.setState({currentPage: 1});
    //console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }

   getdata() {
    var url = (window.location.href)+"";
      const data = url.split("/");
     const type = data[3];
     //alert(type);
     
     if(type == "movie"){
       this.props.getMovieReviews(this.props.location.state.movie.movie.id, this.state.sortState,this.state.currentPage);
     }
     else{
      this.props.getTVShowReviews(this.props.location.state.movie.movie.id, this.state.sortState,this.state.currentPage);
     }
   }

   checkdata() {
    var url = (window.location.href)+"";
    const data = url.split("/");
   const type = data[3];
    if(type == "movie"){
      return (this.props.moviereviews.response);

    }
    else {
      return (this.props.tvshowreviews.response);
    }
   }

   avgrating(){

    var url = (window.location.href)+"";
    const data = url.split("/");
   const type = data[3];
    var avg = 0;
   if(type == "movie"){

     avg = this.props.moviereviews.response ? (Math.round((this.props.moviereviews.response.avg_rating/2) * 10) / 10) : '';

  }
  else {
    avg = this.props.tvshowreviews.response ? (Math.round((this.props.tvshowreviews.response.avg_rating/2) * 10) / 10) : '';
  }

  
  return(avg);
   }
    render() {
      //console.log(this.props);
      const {movie} = this.props.location.state.movie;
      
      const reviews = check(this.checkdata());
      console.log("saawwwwwqq",reviews);
      console.log("123",reviews);
      const rating = this.avgrating();
      console.log("rating is ", rating);
      var url = (window.location.href)+"";
      const data = url.split("/");
     const type = data[3];

      return (
        <div style={styles.dialogContent(movie.background_path)} className="displaycontainer">
            <h1><center><span className="text1">{movie.title} <span className="revrate">Reviews and Ratings</span></span></center></h1>
            {this.state.showPopup ?  <Popup  text='Click "Close Button" to hide popup'  closePopup={this.togglePopup.bind(this)}  />  : null  }  
            <div  className="innerMain">
              <div className="moviedetails">
                <div className="moviecontent">
                    <div >
                  
                      < div className="poster">
                          <img  src={movie.poster_path} className="poster1" />
                        </div>
                      
                        <h2><span className="rating">Average Rating -  {rating}</span></h2>
                        <h2><span className="release">Release Date: {movie.release_date}</span></h2>
                        <h2><span className="genre">Genres - {movie.genre_ids}</span></h2>
                        <h3><span className="smry">{movie.overview}</span></h3>
                      </div>
                    </div>
                  </div>  
              
              

              <div className="review">
                  <div className="choicebuttons">

                  <svg className="svg-icon" viewBox="0 0 20 20" onClick={this.prev}>
							        <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						        </svg>
                    
                    <Link to={{pathname:`/shows/${type}/${movie.id}`}} className="showstext">SHOWS</Link>
                    <div className="filteroption">
                      <div className="filters">
                        <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                          <option disabled selected value defaultValue> -- Select a filter -- </option>
                          <option value="id_asc">Sort by Id ascending ( Default )</option>
                          <option value="rd_asc">Sort by Date ascending</option>
                          <option value="tt_asc">Sort by Rating descending</option>
                          </select>
                        </div>
                      </div> 
                    <button className="addreview" onClick={this.togglePopup.bind(this)}> ADD Review</button>
                    <svg className="svg-icon" viewBox="0 0 20 20" onClick={this.next}>
							        <path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						          next</svg>
                    </div>
                
                  
                
                
                  <div className="reviewContainer">
                     <ReviewList reviews = {reviews}/>
                    </div>
                  </div>

              </div>





          </div>
         
      );
    }
  }
  
  export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
      moviereviews: state.movieBrowser.topMovieReviews,
      tvshowreviews: state.movieBrowser.topTVShowReviews
      
    }),
    // Map action creators to properties of our component
    { ...movieActions }

  )(MovieDisplay);
  /*
  <h1><center><span className="text1">{movie.title} <span className="revrate">Reviews and Ratings</span></span></center></h1>

          <div  className="innerMain">
              <div className="moviedetails">
                  <div >
                
                    < div className="poster">
                        <img  src={movie.poster_path} className="poster1" />
                      </div>
                    
                      <h2><span className="rating">Rating {movie.vote_average}</span></h2>
                      <h2><span className="release">Release Date: {movie.release_date}</span></h2>
                      <h2><span className="genre">Genres - {movie.genre_ids}</span></h2>
                      <h3><span className="smry">{movie.overview}</span></h3>
                    </div>
                </div>
                <div className="review">
                  <div className="choicebuttons">
                    <button className="prev" onClick={this.prev}>Previous</button>
                    <button className="shows"> <Link to="/shows"><span className="showstext">SHOWS</span></Link></button> 
                    <div className="filteroption">
                      <div className="filters">
                        <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                          <option disabled selected value> -- Select a filter -- </option>
                          <option value="id_asc">Sort by Id ascending</option>
                          <option value="rd_asc">Sort by Date ascending</option>
                          <option value="tt_asc">Sort by Rating descending</option>
                          </select>
                        </div>
                      </div> 
                    <button className="addreview"> ADD Review</button>
                    <button className="next" onClick={this.next}>Next</button>
                    </div>
                
                  <Switch>
                    <Route exact path="/shows"  render={(props) => <MovieShows {...props} data={movie} />}/>
                    </Switch>
                
                
                  <div className="reviewContainer">
                     <ReviewList reviews = {reviews}/>
                    </div>
                  </div>
            </div>
      */