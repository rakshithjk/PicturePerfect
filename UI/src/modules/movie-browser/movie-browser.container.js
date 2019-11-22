import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import HomePage from '../home-page/home-page.container';
import * as scrollHelpers from '../common/scroll.helpers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './movie-search/movie-search.container';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './movie-browser.container.css';
import MovieDisplay from './movie-display/movie-display.container'
import AddNew from './add-new/add-new.component'
class MovieBrowser extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      currentPage: 1,
      currentMovies: [],
      sortState: 0
    };
    
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.topFunction = this.topFunction.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    console.log("asdasdassdasdasd0",this.props.content)
    if (this.props.content == 0){
      this.props.getTopMovies(this.state.currentPage,this.state.sortState);
    }
    else {
      this.props.getTopTVshows(this.state.currentPage,this.state.sortState);
    }
    //document.getElementsByClassName("moviebtn").setAttribute("background","background: linear-gradient(315deg, #a40606 0%, #d98324 0%)");
    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  handleScroll() {
    //console.log(this);
    //console.log(this.state);
    //console.log(this.props);
    //console.log(this.props.topMovies);
    //console.log(this.props.topMovies.response)
    //const {topMovies} = this.props;      
    var mybutton = document.getElementById("myBtn");
    if(mybutton!=null){
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }                                      
    if (!this.props.topMovies.isLoading) {
      let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.getdata();
        this.setState({currentPage: nextPage});
      }
    }
  }

  async id_asc() {
    //alert("clicked");
    await this.setState({sortState: 1});
    this.setState({currentPage: 1});
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }


  async rd_asc() {
    //alert("clicked");
    await this.setState({sortState: 2});
    this.setState({currentPage: 1});
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }
  
  async tt_asc() {
    //alert("clicked");
    await this.setState({sortState: 3});
    this.setState({currentPage: 1});
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.getdata();
  }

  getdata() {
    if (this.props.content == 0){
      this.props.getTopMovies(this.state.currentPage,this.state.sortState);
    }
    else {
      this.props.getTopTVshows(this.state.currentPage,this.state.sortState);
    }
  }
  getresponse() {
    if (this.props.content == 0){ 
      
      return(this.props.topMovies.response);
    }
    else{
      return(this.props.topTVShows.response);
    }
  }
  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.topMovies);
    console.log("res",this.props.topMovies.response)
    const {topMovies} = this.props;  

    const movies = movieHelpers.getMoviesList(this.getresponse());
    
    console.log("adsdsadasdasd",movies);
    
    console.log("movies",movies);
    
    


    return (
      <div id="main">
        
      
        
    
      
        
      
       
              <div id="listing">
              <div className="filters">
                <h1></h1>
                <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                <option disabled selected value> -- Select a filter -- </option>
                  <option value="id_asc">Sort by Id ascending ( Default )</option>
                  <option value="rd_asc">Sort by Release Date ascending</option>
                  <option value="tt_asc">Sort by Title</option>
                </select>
                <Link className="addbtn" to="/addnew">Add New</Link>
                <button onClick={this.topFunction} id="myBtn" title="Go to top">Top</button>
              </div>
              <Container id="container"  >
                <Row id="row">
                  <MovieList movies={movies} isLoading={topMovies.isLoading} content={this.props.content}  />
                  
                </Row>
              </Container>
              </div>
              
        
        
    
    
    
    </div>
    );
  }

}

export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies,
    topTVShows: state.movieBrowser.topTVShows
    
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);