import { Component } from "react";
import React from 'react';
import {connect} from 'react-redux';
import {getMovieShows}  from '../movie-browser.actions';
import Showlist from './shows-display.container'
function check (moviesResponse){
    return !!moviesResponse ? ([
      ...moviesResponse.results]) : null;
  }

class MovieShows extends React.Component{

    constructor(props){
        super(props); 
        this.state = {
            currentPage: 1,
            sortState: 0
          };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    }
    componentDidMount(){
        var url = (window.location.href)+"";
          const data = url.split("/");
         const type = data[5];
         this.setState({type:data[4]});
         this.setState({movieid:parseInt(type)});
         alert(data[5]);
        this.props.getMovieShows(data[5],this.state.currentPage,this.state.sortState);
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
    

    checkdata() {
        
          return (this.props.Shows.response);
        
       }

       getdata() {
        
         //alert(type);
         
         if(this.state.type == "movie"){
           this.props.getMovieShows(this.state.movieid,this.state.currentPage,this.state.sortState);
         }
         else{
          this.props.getTVShowReviews(this.state.movieid,this.state.currentPage,this.state.sortState);
         }
       }


    render(){

        const shows = check(this.checkdata());


        return (
            <div>
             <div className="choicebuttons">

<svg className="svg-icon" viewBox="0 0 20 20" onClick={this.prev}>
                  <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
              </svg>
  
   <div className="filteroption">
    <div className="filters">
      <select className="select-style" onChange={this.handleDropdownChange} name="Filters">
        <option disabled selected value defaultValue> -- Select a filter -- </option>
        <option value="id_asc">Sort by Id ascending ( Default )</option>
        <option value="rd_asc">Sort by city ascending</option>
        <option value="tt_asc">Sort by venue descending</option>
        </select>
      </div>
    </div> 
  <svg className="svg-icon" viewBox="0 0 20 20" onClick={this.next}>
                  <path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                next</svg>
  </div>
            <div>       
                 <Showlist shows={shows}/>
            </div>

            </div>

        )
    }
}

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
      Shows: state.movieBrowser.MovieShows
    }),
    {getMovieShows}
  )(MovieShows);