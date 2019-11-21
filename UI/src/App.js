import React, { Component } from 'react';
import MovieBrowser from './modules/movie-browser/movie-browser.container';
import HomePage from './modules/home-page/home-page.container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      // Provides the Material UI theme to child components
      
      <MuiThemeProvider >
        <head>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>
      </head>
      <body>
        <HomePage />
        </body>
      </MuiThemeProvider>
    );
  }
}

export default App;