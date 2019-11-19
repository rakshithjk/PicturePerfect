import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
import HomePage from './modules/home-page/home-page.container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      // Provides the Material UI theme to child components
      <MuiThemeProvider >
        <HomePage />
      </MuiThemeProvider>
    );
  }
}

export default App;