import React, {Component} from 'react';
import './navbar.css';

class Navbar extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      log_state:"Login",
      log_name:''
    }
  }

  handlelogin()
  {
    if(this.state.log_state=='Logout')
    {
      window.localStorage.setItem('user_id','')
      window.localStorage.setItem('name','')
      this.props.history.push('./login')
      
    }
    else
    {
      this.props.history.push('./login')
    }
  }

  componentDidMount()
  {
    if(window.localStorage.getItem('user_id')!='')
    {
      this.setState({log_state:'Logout',log_name:<h2>Welcome {window.localStorage.getItem('name')}</h2>})
    }
    else
    {
      this.setState({log_state:'Login',log_name:''})
    }
  }



  render(){
    return (

      <div className="Navbar Navbar-expand-lg">
      <nav className="navbar navbar-expand-lg navbar-dark ">
      <img src="/roundlogo.jpg" width="50"  height="50" class=" logo d-inline-block align-left" alt=""/> 
          <h3>DIGITAL HERITAGE </h3>
        
        
        <div className="navbar-nav collapse navbar-collapse " id="navbarNavDropdown">
          <button className="nav-item" onClick={()=> this.props.history.push('./')}>Home</button>
          <button className="nav-item" onClick={()=> this.props.history.push('/register')}>Register</button>
          <button className="nav-item" onClick={()=> this.handlelogin()} >{this.state.log_state}</button>
          <button className="nav-item" onClick={()=> this.props.history.push('/login')}>Admin</button>
        </div>
      </nav>

      <div className='Welcome'>
        {this.state.log_name}
      </div>
    </div>
    )
  
   }
}

export default Navbar;