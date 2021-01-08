import React, {Component} from 'react';
import '../job.css';
import axios from 'axios'

class Job1soln extends Component{
    constructor(props)
    {   super(props);
         this.state={
            job_soln:props.location.state.soln
            }
         
        
    }

    promptdetails(id){
        axios.get('http://localhost:3001/userdetails/'+id)
        .then(response=>{
            
            this.props.history.push('/usercontact',{name:response.data.name,email:response.data.email,mob:response.data.number})
            
        })


    }

    render(){
        if(this.state.job_soln.length){
            return(
                <div className="table-wrapper">

                <table className="fl-table">
                    <thead>
                        <th>SOLUTION</th>
                        <th>User Details</th>
                    </thead>
                    {this.state.job_soln.map(x=>
                    <tr>
                    <td>{x.answer}</td> 
                    <td>< button id="btn" onClick={()=>{this.promptdetails(x.user_id)}} >Client Details</button></td>
                    </tr>)}
                </table>

                </div>
            )
        }
        else{
            return(
                <h1>No solution yet</h1>
            )
        }
    }
    
}

export default Job1soln