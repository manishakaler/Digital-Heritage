import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Alljobs extends Component{
    constructor(props)
    {   super(props);
         this.state={
            jobs:props.location.state.alljobs,
            
            };
        this.jobs=this.state.jobs
        
    }

    async deletejob(id){
        await axios.post('http://localhost:3001/deletejob/',{'id':id})
        await axios.get('http://localhost:3001/getjobs/' + window.localStorage.getItem('user_id'))
        .then(
            response=>{this.setState({jobs:response.data})
             console.log("cdm",response.data)
        }
        )
        
    }

    handleRoute(x)
    {   if(x.jobtype=='Description')
        this.props.history.push('/job1soln',{soln:x.soln})
        if(x.jobtype=='Add Images')
        this.props.history.push('/job2soln',{soln:x.soln})
        if(x.jobtype=='Add Annotation')
        this.props.history.push('/job3soln',{soln:x.soln})
    }

    handleRoutepages(x)
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


    
    render(){
        var h1="No Job Found"
        if(this.state.jobs.length>0)
            h1="POSTED JOBS"
        return(
            <div className='Jobs'>
                 <img src="/entrance.jpeg" id="bg-img"/> 
        
                 <div className='table-heading'>
                    <h2>{h1}</h2>
                 </div>
                <div className='Search'>
                    <input placeholder="Search" onChange={(event)=>this.handleChange(event)}/>
                </div>
                <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Jobtype</th>
                            <th>No of Solution</th>
                            <th>Solution</th>
                            <th>Open Job</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {this.state.jobs.map(x => <tr> 
                        <td>{x.title}</td>
                        <td> {x.jobtype}</td>
                        <td>{x.soln.length}</td>
                        <td><button id="btn" onClick={()=>this.handleRoute(x)}>Solutions</button> </td>
                        <td><button id="btn" onClick={()=> this.handleRoutepages(x)}>Open Job</button></td>
                        <td> <button id="btn" color="warning" onClick={()=>{this.deletejob(x._id)}}>Delete</button></td>
                        </tr>)}
                    
                </table>
            </div>
        </div>
        )
       
    }
}

export default Alljobs;