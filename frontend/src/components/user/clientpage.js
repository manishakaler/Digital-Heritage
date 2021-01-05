import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Clientpage extends Component{
    constructor(props)
    {   super(props);
         this.state={
            newjobs:[],
            oldjobs:[],
            jobs:[]
            }
            this.jobs=[];
            this.head='NEW JOBS'
    }

    handleRoute(x)
    {   if(x.jobtype=='Description')
        this.props.history.push('/job1page',{id:x._id,title:x.title,img:x.img,description:x.description})
        if(x.jobtype=='Add Images')
        this.props.history.push('/job2page',{id:x._id,title:x.title,description:x.description})
        if(x.jobtype=='Add Annotation')
        this.props.history.push('/job3page',{id:x._id,title:x.title,img:x.img,description:x.description})
    }
    handleChange(event)
    {   
        var searchterm=event.target.value
       
    
        if(searchterm=='')
        {   
            this.setState({jobs:this.jobs})
        }
        else
        {   
            var jobs=this.jobs.filter(job=> job.title.toLowerCase().includes(searchterm.toLowerCase()))
            this.setState({jobs:jobs})
            
            
        }
    }

    componentDidMount(){

        
        axios.get('http://localhost:3001/getalljobs/' + window.localStorage.getItem('user_id'))
        .then(
            
            response=>{
                this.jobs=response.data.new
                this.setState({newjobs:response.data.new,oldjobs:response.data.old,jobs:response.data.new})
             
        }
        )
    

    }

    render(){
        
        if(this.state.newjobs.length>0||this.state.oldjobs.length>0)
        return(
            <div className="Jobs">
                <img src="/entrance.jpeg" id="bg-img"/>
                <div className='Search'>
                    <label>
                        Search
                        <input onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    
                </div>
                <button onClick={()=>{
                    this.head='NEW JOBS'
                    this.jobs=this.state.newjobs
                    this.setState({jobs:this.state.newjobs})
                    
                    }}>New jobs</button>

                <button onClick={()=>{
                   this.head='COMPLETED JOBS'
                    this.jobs=this.state.oldjobs
                    this.setState({jobs:this.state.oldjobs})
                    
                    }}>Completed jobs</button>
                    
                <div className='table-wrapper'>
                    <h2>{this.head}</h2>
                    <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Jobtype</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                        {this.state.jobs.map(x => <tr><td>{x.title}</td> <td>{x.jobtype} </td> <td><button id="btn" onClick={()=> this.handleRoute(x)}>Open</button></td></tr>)}
                        
                    </table>
                </div>
               
            </div>
        )
        else
        return(
            <h1>No Job found</h1>
        )
    }
}

export default Clientpage;