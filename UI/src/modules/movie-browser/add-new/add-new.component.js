import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './add-new.component.css'

class AddNew extends Component {
    render() {
      return (

        <div>


          <div class="form-style-5">
<form>
<fieldset>
<legend><span class="number">1</span> Type of Upload</legend>
<select id="job" name="field4">
<optgroup label="">
  <option value="Movie">Movie</option>
  <option value="TV Show">TV Show</option>
  <option value="Documentary">Documentary</option>
</optgroup>

</select>     
<legend><span class="number">2</span> Details</legend>
<input type="text" name="field1" placeholder="Title *"/>
<input type="email" name="field2" placeholder="Language *"/>
<input type="date" name="field2" placeholder="Release Date *"/>
<input type="email" name="field2" placeholder="Genre *"/>
<textarea name="field3" placeholder="Overview"></textarea>

</fieldset>
<fieldset>
<legend><span class="number">3</span> Genre</legend>
<input type="radio" value="male" name="Horror"/>Horror
<input type="radio"  value="male" name="Action"/>Action
<input type="radio"  value="male" name="Animated"/>Animated
<input type="radio"  value="male" name="Family"/>Family
<input type="radio"  value="male" name="Fantasy"/>Fantasy
<br/>
<br/>
</fieldset>
<fieldset>
<legend><span class="number">4</span> Genre</legend>
Upload Poster Image  <input className="fileuploadbtn" type="file" name="poster"/><br/>
<br/>
Upload Backdrop Image<input className="fileuploadbtn" type="file" name="backdrop"/>
</fieldset>

<input type="submit" value="Apply" />
</form>
</div>
          

            </div>
        
      );
    }
  }
  
  export default AddNew;