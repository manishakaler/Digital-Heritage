import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Admin extends Component{
    constructor(props){
        super(props)
        this.state={
            job_types:[],
            users:[],
            disp1:'',
            disp2:"none"
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
        this.alljobs=[]
        
           
        
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
        axios.get('http://localhost:3001/getalljobs/' + window.localStorage.getItem('user_id'))
        .then(
            
            response=>{
                this.alljobs=response.data.new.concat(response.data.old)
                
                
             
        }
        )
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

            <div className="toggle-admin">
            <button autoFocus id="new" onClick={()=>{this.setState({disp1:'',disp2:'none'})}}> Job Type Details</button>
            <button id="comp" onClick={()=>{this.setState({disp1:'none',disp2:''})}}> Statistics</button>
            </div>

            <div className="jobtype" style={{display:this.state.disp1}}>
                   
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

                <div ClassName="jobtype" style={{display:this.state.disp2}}>
                    <div className="table-wrapper">
                    <table className="fl-table">
                        <thead>
                            <th>Users and Jobs </th>
                            <th>Count</th>
                            <th>Details</th>
                        </thead>

                    <tr>
                        <td>Users</td>
                        <td>{this.state.users.length}</td>
                        <td><button id="btn" onClick={()=>this.props.history.push('/alluser',{users:this.state.users})}>Get User list</button></td>
                    </tr>
                    <tr>
                        <td>Jobs</td>
                        <td>{this.jobs.job1+this.jobs.job2+this.jobs.job3}</td>
                        <td><button id="btn" onClick={()=>this.props.history.push('/alljobs',{alljobs:this.alljobs})}>Get Job list</button></td>
                    </tr>

                    

                    </table>

                    </div>

                </div>
                
                


                <div className="Addjobtype" style={{display:this.state.disp1}}>
                    <h3>Add a New Job</h3>
                        <h4>Enter jobtype title</h4>
                        <input type="text"  placeholder={this.jobtype.title} onChange={(event)=>this.jobtype.title=event.target.value}/>
                        
                        <h4>Enter route</h4>
                        <input type="text"  placeholder={this.jobtype.route} onChange={(event)=>this.jobtype.route=event.target.value}/>
                        
                    
                    <button id="btn" onClick={()=>{this.handlesubmit()}}>Add Jobtype</button>

                </div>
                
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