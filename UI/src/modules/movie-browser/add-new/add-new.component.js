import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './add-new.component.css'
import {connect} from 'react-redux';

class AddNew extends Component {

  constructor(props){
    super(props);
    this.state = {
      type:"Movie",
      title:"",
      language:"",
      releasedate:"",
      overview:"",
      horror:0,
      action:0,
      animated:0,
      family:0,
      fantasy:0,
      poster:"",
      backdrop:""

    }
  }

  componentDidMount(){
    
  }

  async handleChange(event) {
    const name = event.target.name;
    //console.log(name);
    this.setState({ [name]: event.target.value})
    //console.log(this.state);
  }

  async handleChangefile(event) {
    const name = event.target.name;
    //console.log(name);
    this.setState({ [name]: event.target.files[0]})
    //console.log(this.state);
  }

  async handleChangecheckbox(event) {
    const name = event.target.name;
    //console.log(name);
    this.setState({ [name]: event.target.checked})
    //console.log(this.state);
  }

  async handleSubmit(event) {
    // alert("ASd");
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/add/form-submit-url', {
      method: 'POST',
      body: data,
    });
    //addData(this.state.type,this.state.title,this.state.language, this.state.release_date, this.state.overview, this.state.action, this.state.posterpath, this.state.background_path);
  }

    render() {
      return (

        <div>


          <div class="form-style-5">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <fieldset>
                <legend><span class="number">1</span> Type of Upload</legend>
                <select id="job" name="type" onChange={this.handleChange.bind(this)}>
                  <optgroup label="">
                    <option value="Movie">Movie</option>
                    <option value="TV Show">TV Show</option>
                    <option value="Documentary">Documentary</option>
                  </optgroup>

                </select>     
                <legend><span class="number">2</span> Details</legend>
                <input type="text" name="title" placeholder="Title *" onChange={this.handleChange.bind(this)} value={this.state.title} />
                
                <input type="date" name="releasedate" placeholder="Release Date *" onChange={this.handleChange.bind(this)} value={this.state.releasedate}/>

                <input type="text" name="language" placeholder="Language *" onChange={this.handleChange.bind(this)} value={this.state.language} />
                
                
                <textarea name="overview" placeholder="Overview" onChange={this.handleChange.bind(this)} value={this.state.overview}></textarea>

              </fieldset>

              <fieldset>
              <legend><span class="number">3</span> Genre</legend>
              <input type="checkbox" value={this.state.horror} onChange={this.handleChangecheckbox.bind(this)} name="horror"/>Horror
              <input type="checkbox"  value={this.state.action} name="action" onChange={this.handleChangecheckbox.bind(this)}/>Action
              <input type="checkbox"  value={this.state.animated} name="animated" onChange={this.handleChangecheckbox.bind(this)}/>Animated
              <input type="checkbox"  value={this.state.family} name="family" onChange={this.handleChangecheckbox.bind(this)}/>Family
              <input type="checkbox"  value={this.state.fantasy} name="fantasy" onChange={this.handleChangecheckbox.bind(this)}/>Fantasy
              <br/>
              <br/>
              </fieldset>

              <fieldset>
              <legend><span class="number">4</span> Uploads</legend>
              Upload Poster Image  <input className="fileuploadbtn"  type="file" name="poster" onChange={this.handleChangefile.bind(this)}/><br/>
              <br/>
              Upload Backdrop Image<input className="fileuploadbtn" type="file" name="backdrop" onChange={this.handleChangefile.bind(this)}/>
              </fieldset>

              <input type="submit" value="Submit"/>
            </form>
          </div>
          

        </div>
        
      );
    }
  }
  
  export default connect(
    
  )(AddNew); 