import React, {Component} from 'react';
import './Sign-in-up.css';
import {BrowserRouter as Router,Switch,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import axios from 'axios'



class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {username: '', password: '',email:'',dob:'',gender:'',user_type:'',number:'',education:''}
    this.handleSubmit = this.handleSubmit.bind(this);
  }



 handleSubmit(event) {
    
    
  const response=axios.post('http://localhost:3001/register', this.state)
      .then(response => {
        if(response.data===800)
        {
          alert("Email id already registered")
        }
        if(response.data===200)
        {
          alert("Registration complete")
          this.props.history.push('/login')
        }
      })
      .catch(err => {
        console.error(err);
      });
    console.log(this.state)
    event.preventDefault();
}

  render(){
    if(window.localStorage.getItem('user_id')=='')
    return (
      
      <div className="Registerparent">
      
      <div className="form-modal">  
        <div class="form">
          <button id="signup-toggle">Register</button>
        </div>
        
      <div id="signup-form">
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" placeholder="Username"  onChange= {(event) =>{this.state.username=event.target.value}} required />
        </label>
        
        <label>
          Email:
          <input type="email" placeholder="Email" onChange= {(event) =>{this.state.email=event.target.value}} required />
        </label>

        <label>
          Mobile Number:
          <input type="Number" placeholder="Number" onChange= {(event) =>{this.state.number=event.target.value}} required />
        </label>

        <label>
          Password:
          <input type="Password" placeholder="Password" onChange={(event) =>{this.state.password=event.target.value}} required />
        </label>

        <label>
          Date_of_Birth:
          <input type="date" placeholder="DOB" onChange={(event) =>{this.state.dob=event.target.value}} required />
        </label>

        <div className="Dropdown">
        <label>
          Education Quallification
            <select onChange={(event=>{this.state.education=event.target.value})} defaultValue="Select" id = "dropdownbtn"> 
              <option value="Select">---</option>
              <option value="School">School</option>
              <option value="High School">High School</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
        </label>

        <label>
          Gender
            <select onChange={(event=>{this.state.gender=event.target.value})} defaultValue="Select" id = "dropdownbtn"> 
              <option value="Select">---</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
        </label>

        <label>
          Type of User
            <select onChange={(event=>{this.state.user_type=event.target.value})} defaultValue="Select" id = "dropdownbtn"> 
              <option value="Select">---</option>
              <option value="Client">Client</option>
              <option value="Provider">Provider</option>
             
            </select>
        </label>
        </div>
      
        <input type="submit" class="btn signup" value="Submit" />
       </form>
      </div>
     </div>

    </div>
    );
    else
    return(
      <h2>You are already Logged in</h2>
    )
  }
}

export default Register;