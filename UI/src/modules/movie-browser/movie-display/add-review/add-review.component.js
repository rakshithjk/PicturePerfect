import React from 'react';  
import './add-review.component.css';  

class Popup extends React.Component {  
  render() {  
return (  
    <div className='popup'>  
        <div className='popup\_inner'>  
            <div className="head">
                <h1></h1>
                <h1 className="new">Add Rating</h1>
    
        
                <svg  className="closeicon"  version="1.1" onClick={this.props.closePopup}
                    xmlns="http://www.w3.org/2000/svg">
                    <line x1="1" y1="11" 
                        x2="11" y2="1" 
                        stroke="white" 
                        stroke-width="5"/>
                    <line x1="1" y1="1" 
                        x2="11" y2="11" 
                        stroke="white" 
                        stroke-width="5"/>
                    </svg>
        
        
        
         
                </div>
                <br/>
                <div className="ratingfield">
                    <h1 className="ratingtext">Enter Rating from 1-10</h1> 
                    <input className="input" size="4"></input> 
                     </div>
    
                <br/>
                <br/>
    
                <center><h1 className="new"> Enter Review</h1></center>
                <center><textarea className="message" rows="10" cols="50"></textarea></center>
                <center><input type="submit" className="sbtbtn"></input></center>
         </ div>  
    </div> 
);  
}  
}  

export default Popup;

/*


*/