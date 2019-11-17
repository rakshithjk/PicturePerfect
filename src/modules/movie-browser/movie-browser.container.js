import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import {AppBar, TextField, RaisedButton} from 'material-ui';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';
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
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage,this.state.sortState);
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
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getTopMovies(this.state.currentPage,this.state.sortState)
  }


  async rd_asc() {
    //alert("clicked");
    await this.setState({sortState: 2});
    this.setState({currentPage: 1});
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getTopMovies(this.state.currentPage,this.state.sortState)
  }
  
  async tt_asc() {
    //alert("clicked");
    await this.setState({sortState: 3});
    this.setState({currentPage: 1});
    console.log("whats happening",this.props.topMovies.response);
    //setState({results:[]})
    //alert(this.state.sortState);
    this.props.getTopMovies(this.state.currentPage,this.state.sortState)
  }

  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.topMovies);
    console.log("res",this.props.topMovies.response)
    //const {topMovies} = this.props;   
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(this.props.topMovies.response);
    console.log("movies",movies);
    
    const Home = () => (
      <div>
        <h1>Welcome to Picture Perfect Website!</h1>
      </div>
    )
    


    return (
      <div id="main">
        
      

    
      <Router>
        
      <AppBar title='Movie Browser' style={{backgroundColor: "#e91e63"}} >
      <Link to="/">
          <RaisedButton >
            Home
          </RaisedButton >
          </Link>

        <Link to="/search">
          <RaisedButton >
            Search
          </RaisedButton >
          </Link>
          <Link to="/movie-list">
            <RaisedButton > 
            Movie-List
            </RaisedButton>
          </Link>
      </AppBar>
      
          <Switch>
          <Route exact path='/' component={Home}/>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/movie-list" >  
              <div id="listing">
              <div className="filters">
                <h3 className="text"> Filters</h3>
                <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
                <option disabled selected value> -- Select a filter -- </option>
                  <option value="id_asc">Sort by Id ascending</option>
                  <option value="rd_asc">Sort by Release Date ascending</option>
                  <option value="tt_asc">Sort by Title</option>
                </select>
                <button className="addbtn">Add new</button>
              </div>
              <Container id="container"  >
                <Row id="row">
                  <MovieList movies={movies} isLoading={topMovies.isLoading}  />
                </Row>
              </Container>
              </div>
              
            </Route>
            <Route path='/moviedescription/:movieid' component={MovieDisplay}/>
          </Switch>
        
        
    
    </Router>
    
    </div>
    );
  }

}

export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    topMovies: state.movieBrowser.topMovies
    
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);