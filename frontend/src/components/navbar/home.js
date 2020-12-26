import React, {Component} from 'react';
import './home.css';
import Vidoebg from "../Images/videoplayback.mp4";

class Home extends Component {
  constructor(props)
  {
    super(props)
  }
  render(){
    return (

      <div className="Home">
      <h3 id="title">|| Digital Humanities ||</h3>
      <p id="intro">“...Technology alone is not enough — it's technology married with liberal arts, married with the humanities
        , that yields us the results that make our heart sing.” ~ Steve Jobs</p>
       <video id="background-video" poster="../Images/poster.jpg" autoPlay loop muted>
          <source src={Vidoebg} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
    </div>
    )
  
   }
}

export default Home;