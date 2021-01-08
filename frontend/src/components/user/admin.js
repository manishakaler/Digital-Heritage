import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Admin extends Component{
    constructor(props){
        super(props)
        this.state={
            job_types:[],
            users:[]
        }
        this.jobtype={
            title:'',
            route:''
        }
        this.jobs={
            job1:Int32Array,
            job2:Int32Array,
            job3:Int32Array

        }
    }
    componentDidMount(){
        axios.get('http://localhost:3001/getjobdetails')
        .then((response)=>{
            this.jobs.job1=response.data.job1;
            this.jobs.job2=response.data.job2;
            this.jobs.job3=response.data.job3
        })
        axios.get('http://localhost:3001/alluserdetails')
        .then(response=>{
            this.setState({users:response.data})
        })
        axios.get('http://localhost:3001/getjobtype')
        .then((response)=>{this.setState({job_types:response.data})})
        axios.get('http://localhost:3001/getjobdetails')
        .then((response)=>{
            this.jobs.job1=response.data.job1;
            this.jobs.job2=response.data.job2;
            this.jobs.job3=response.data.job3
        })
    }
    
    handlesubmit(){
        axios.post('http://localhost:3001/savejobtype',this.jobtype)
        .then((response)=>{
            this.jobtype.title='';
            this.jobtype.route='';
            this.setState({job_types:response.data})
            
        })
        
        
    }
    handledelete(id){
        axios.post('http://localhost:3001/deletejobtype',{'id':id})
        .then((response)=>this.setState({job_types:response.data}))
    }
    render(){
        if(localStorage.getItem('name')=='admin')
        return(
            <div className="Admin">
            <img src="/entrance.jpeg" id="bg-img"/>

            <div className="jobtype">
                    <h2>Jobs added so far</h2>
                <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <th>Jobtype title</th>
                            <th>Jobtype route</th>
                            <th>Delete</th>
                        </thead>
                        {this.state.job_types.map(x=>
                            <tr>
                                <td>{x.title}</td>
                                <td>{x.route}</td>
                                <td><button id="btn" onClick={()=>{this.handledelete(x._id)}}>Delete</button></td>
                            </tr>  
                                )
                        }
                    </table>

                </div>
                </div>
                
                


                <div className="Addjobtype">
                    <h3>Add a New Job</h3>
                        <h4>Enter jobtype title</h4>
                        <input type="text"  placeholder={this.jobtype.title} onChange={(event)=>this.jobtype.title=event.target.value}/>
                        
                        <h4>Enter route</h4>
                        <input type="text"  placeholder={this.jobtype.route} onChange={(event)=>this.jobtype.route=event.target.value}/>
                        
                    
                    <button id="btn" onClick={()=>{this.handlesubmit()}}>Add Jobtype</button>

                </div>



                <div ClassName="Details">
                    <h2>Statistics</h2>
                    <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <th>Users and Jobs </th>
                            <th>Count</th>
                        </thead>

                    <tr>
                        <td>Users</td>
                        <td>{this.state.users.length}</td>
                    </tr>
                    <tr>
                        <td>Jobs</td>
                        <td>{this.jobs.job1+this.jobs.job2+this.jobs.job3}</td>
                    </tr>

                    <tr>
                        <td>Description Jobs</td>
                        <td>{this.jobs.job1}</td>
                    </tr>
                    
                    <tr>
                        <td>Annotation Jobs</td>
                        <td>{this.jobs.job2}</td>
                    </tr>

                    <tr>
                        <td>Annotation Jobs</td>
                        <td>{this.jobs.job3}</td>

                    </tr>

                    </table>

                    </div>

                </div>

                <button id="getdetails" onClick={()=>this.props.history.push('/alluser',{users:this.state.users})}>Get User list</button>

                
            </div>   
            
        )
        else
        {
            return(
                <h1>Not A Admin</h1>
            )
        }
    }
}

export default Admin;