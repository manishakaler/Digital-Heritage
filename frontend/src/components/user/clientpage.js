import React, {Component} from 'react';
import './userpage.css';
import axios from 'axios'


class Clientpage extends Component{
    constructor(props)
    {   super(props);
         this.state={
            newjobs:[],
            oldjobs:[]
            }
    }

    handleRoute(x)
    {   if(x.jobtype=='Description')
        this.props.history.push('/job1page',{id:x._id,title:x.title,img:x.img,description:x.description})
        if(x.jobtype=='Add Images')
        this.props.history.push('/job2page',{id:x._id,title:x.title,description:x.description})
        if(x.jobtype=='Add Annotation')
        this.props.history.push('/job3page',{id:x._id,title:x.title,img:x.img,description:x.description})
    }

    componentDidMount(){

        
        axios.get('http://localhost:3001/getalljobs/' + window.localStorage.getItem('user_id'))
        .then(
            
            response=>{this.setState({newjobs:response.data.new,oldjobs:response.data.old})
             console.log(response.data)
        }
        )

    }

    render(){
        if(this.state.newjobs.length>0||this.state.oldjobs.length>0)
        return(
            <div className="Jobs">
                <img src="/entrance.jpeg" id="bg-img"/>
                <div className='table-wrapper'>
                    <h2>NEW JOBS</h2>
                    <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Jobtype</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                        {this.state.newjobs.map(x => <tr><td>{x.title}</td> <td>{x.jobtype} </td> <td><button id="btn" onClick={()=> this.handleRoute(x)}>Open</button></td></tr>)}
                        {/* Jobs:{this.state.jobs} */}
                    </table>
                </div>
                <div className="table-wrapper">
                    <h2>COMPLETED JOBS</h2>
                    <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Jobtype</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                        {this.state.oldjobs.map(x => <tr><td>{x.title}</td> <td>{x.jobtype} </td> <td><button id="btn" onClick={()=> this.handleRoute(x)}>Open</button></td></tr>)}
                        {/* Jobs:{this.state.jobs} */}
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