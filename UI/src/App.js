import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBardiv from './modules/common/AppBar.component'
import HomePage from './modules/home-page/home-page.container'
import Search from './modules/movie-browser/movie-search/movie-search.container'
import MovieDisplay from './modules/movie-browser/movie-display/movie-display.container'
import AddNew from './modules/movie-browser/add-new/add-new.component'
import MovieShows from './modules/movie-browser/movie-shows/movie-shows.display'

class App extends Component {
  render() {
    return (
      // Provides the Material UI theme to child components
      
      <MuiThemeProvider >
        <Router>

          <div>
            <AppBardiv/>
        <Switch>
        
          
          <Route exact path='/'  render={(props) => <HomePage {...props} active={1} />}  />
        
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
        
        <Route path="/shows/:type/:dataid"  render={(props) => <MovieShows  />}/>
    </Switch>
    </div>
    </Router>
    <div className="footer">
          .
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;