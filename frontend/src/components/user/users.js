import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'

class Users extends Component{
    constructor(props){
        super(props)
        this.state={
            users:props.location.state.users
        }
        this.users=this.state.users
    }

    givedetails(x)
    {
        if(x.usertype=="Client")
        {
            axios.post('http://localhost:3001/getclientdetails',{'id':x._id})
            .then(response=>{
            
                alert('Descryption jobs Completed='+response.data.job1+'\nAdd Image Job Completed='+response.data.job2+'\nAnnotation Job Completed='+response.data.job3)
            })
        }
        if(x.usertype=="Provider")
        {
            axios.post('http://localhost:3001/getproviderdetails',{'id':x._id})
            .then(response=>{
            
                alert('Descryption jobs='+response.data.job1+'\nAdd Image Job='+response.data.job2+'\nAnnotation Job='+response.data.job3)
            })
        }
    }

    handleChange(event)
    {   
        var searchterm=event.target.value
        
        if(searchterm=='')
        {   
            this.setState({users:this.users})
        }
        else
        {   console.log(event.target.value)
            var users=this.users.filter(user=> user.name.toLowerCase().includes(searchterm.toLowerCase()) || user.email.toLowerCase().includes(searchterm.toLowerCase()) )
            this.setState({users:users})
            console.log(users)
            
        }
    }

    render(){
        return(
            <div className="Users">
                <div className='Search'>
                    <label>
                        Search
                        <input onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    
                </div>
                <div className="Users Details">
                        <h2>Registered Users Details </h2>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <th>User id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mob Number</th>
                                <th>Education</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Type of User</th>
                                <th>Get Details</th>
                            </thead>
                            {this.state.users.map(x=>
                            <tr>
                                <td>{x._id}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.number}</td>
                                <td>{x.education}</td>
                                <td>{x.gender}</td>
                                <td>{x.dob}</td>
                                <td>{x.usertype}</td>
                                <td><button id="btn" onClick={()=>{this.givedetails(x)}}>Submission details</button></td>
                                
                            </tr>)}
                        </table>
                    </div>
                    </div>

            </div>
        )
    }
}
export default Users;