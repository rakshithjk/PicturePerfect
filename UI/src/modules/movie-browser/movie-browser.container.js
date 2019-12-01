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
      sortState: 0,
      searchfield: ""
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

  handleChange(event) {
    const name = event.target.name;
    //console.log(name);
    this.setState({ [name]: event.target.value})
    //console.log(this.state);
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
                <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                <option disabled selected value> -- Select a filter -- </option>
                  <option value="id_asc">Sort by Id ascending ( Default )</option>
                  <option value="rd_asc">Sort by Release Date ascending</option>
                  <option value="tt_asc">Sort by Title</option>
                </select>

                <div className="searchdiv">
            <input type="text" name="searchfield" onChange={this.handleChange.bind(this)} className="searchbarinput" placeholder="Search..." />
            
 <svg class="search-svg-icon" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg>

            
            </div>


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