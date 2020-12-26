import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from "./components/navbar/home";
import Navbar from './components/navbar/navbar'
import Login from "./components/auth/login"
import Register from './components/auth/register'
import Clientpage from './components/user/clientpage';
import Providerpage from './components/user/providerpage';
import Admin from './components/user/admin';
import Job1page from './components/jobs/job1/job1show'
import Job1addpage from './components/jobs/job1/job1add'
import Job1soln from './components/jobs/job1/job1soln'
import Job2page from './components/jobs/job2/job2show'
import Job2addpage from './components/jobs/job2/job2add'
import Job2soln from './components/jobs/job2/job2soln'
import Job3page from './components/jobs/job3/job3show'
import Job3addpage from './components/jobs/job3/job3add'
import Job3soln from './components/jobs/job3/job3soln'
import Job4addpage from './components/jobs/job4/job4add'




const ProtectedRoute = ({component:Component,...rest})=>{
  return(
    <Route 
      {...rest}
            
            component={(props) => (
                <div>
                    <Navbar {...props} /> 
                    <Component {...props} />
                </div>
            )}
        />

  )
}
class App extends Component {

  render(){
    return (
      <Router>
        
          
          <ProtectedRoute exact  path="/" component={Home} />
          <ProtectedRoute exact  path='/login'component={Login}  />
          <ProtectedRoute exact  path='/register' component={Register} />
          <ProtectedRoute exact  path='/clientpage' component={Clientpage} />
          <ProtectedRoute exact  path='/providerpage' component={Providerpage} />
          <ProtectedRoute exact  path='/admin' component={Admin} />
          <ProtectedRoute exact  path='/job1page' component={Job1page}/>
          <ProtectedRoute exact  path='/job1add' component={Job1addpage}/>
          <ProtectedRoute exact  path='/job1soln' component={Job1soln}/>
          <ProtectedRoute exact  path='/job2page' component={Job2page}/>
          <ProtectedRoute exact  path='/job2add' component={Job2addpage}/>
          <ProtectedRoute exact  path='/job2soln' component={Job2soln}/>
          <ProtectedRoute exact  path='/job3page' component={Job3page}/>
          <ProtectedRoute exact  path='/job3add' component={Job3addpage}/>
          <ProtectedRoute exact  path='/job3soln' component={Job3soln}/>
          <ProtectedRoute exact  path='/job4add' component={Job4addpage}/>
          

        
            
        

      </Router>
      
    );
  }
}

export default App;
