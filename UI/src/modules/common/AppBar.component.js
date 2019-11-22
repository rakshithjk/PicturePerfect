import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import {AppBar, TextField, RaisedButton} from 'material-ui';
import "./appbar.css"
class AppBardiv extends Component {

    render() {
      console.log(this.props);
      return (
          
        <div>
        <AppBar title='Picture Perfect' position="static" style={{backgroundColor: "#a40606"}} className="appbar">
            <div className="appbarbtn">
              <Link to="/"

              className={this.props.active=="1" ? 'homebtn--active':"homebtn"} >
                Home
              
              </Link>

              <Link to="/search" className="searchbtn">
                  Search
              </Link>
                
              <Link to="/movie-list" className="moviebtn"> 
                  Movie-List
              </Link>
            </div>
          </AppBar>
        
        </div>
)
      }
    }
    export default AppBardiv;