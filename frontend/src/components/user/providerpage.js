import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Providerpage extends Component{
    constructor(props)
    {   super(props);
         this.state={
            jobs:[],
            job_types:[]
            };
        this.jobs=[]
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


    componentDidMount(){

        
        axios.get('http://localhost:3001/getjobs/' + window.localStorage.getItem('user_id'))
        .then(
            response=>{
                this.jobs=response.data
                this.setState({jobs:response.data})
             
        }
        )
        axios.get('http://localhost:3001/getjobtype')
        .then((response)=>{this.setState({job_types:response.data})})

    }

    render(){
        var h1="No Job Found"
        if(this.state.jobs.length>0)
            h1="Following are the Jobs posted"
        return(
            <div className='Jobs'>
                 <img src="/entrance.jpeg" id="bg-img"/> 
                 
                 <div className="Addjobtype">
                 <h2>Select a job to Add</h2>
                <select onChange={(event)=>{this.props.history.push(event.target.value)}} defaultValue="/job1add" id = "dropdown">
                    <option>Select Job</option>
                    {this.state.job_types.map(x=>
                        <option value={x.route}>{x.title}</option>
                        )}
                </select>
                 </div>
                 <div className='Search'>
                    <label>
                        Search
                        <input onChange={(event)=>this.handleChange(event)}/>
                    </label>
                    
                </div>

                <h2>{h1}</h2>
                <div className="table-wrapper">
                <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Jobtype</th>
                            <th>Solution</th>
                            <th>Open Job</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {this.state.jobs.map(x => <tr> 
                        <td>{x.title}</td>
                        <td> {x.jobtype}</td>
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

export default Providerpage;