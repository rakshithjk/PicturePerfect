import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink 
  } from "react-router-dom";
  import {AppBar, TextField, RaisedButton} from 'material-ui';
import "./appbar.css"
class AppBardiv extends Component {

    render() {
      console.log(this.props);
      console.log(this.props);
      return (
          
        <div>
        <div   className="appbar">
          <div>
            <NavLink to="/" className="homebtn" activeClassName="homebtnchosen">
            Picture Perfect
              </NavLink>
            </div>
            <div>
            
            
              </div>  

            
          </div>
          </div>
        
        
)
      }
    }
    export default AppBardiv;