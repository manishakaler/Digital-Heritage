import React, {Component} from 'react';
import axios from 'axios'

class Job2soln extends Component{
    constructor(props)
    {   super(props);
         this.state={
            job_soln:props.location.state.soln
            }
         
        
    }

    promptdetails(id){
        axios.get('http://localhost:3001/userdetails/'+id)
        .then(response=>{
            
            alert('Name='+response.data.name +'\nEmail='+response.data.email +'\nMobile Number='+response.data.number)
        })


    }

    render(){
        console.log(this.state.job_soln)
        if(this.state.job_soln.length){
            return(
                <div className="table-wrapper">

                <table className="fl-table">
                    <thead>
                        <th>SOLUTION</th>
                        <th>Meta-Data</th>
                        <th>User Details</th>
                    </thead>
                    
                    {this.state.job_soln.map(x=>
                    <tr> <td>Images: <ul>{x.image.map(img=><li><a target='_blank' href={'http://localhost:3001/getimage/'+img} >{img}</a></li>)}</ul> </td>
                    <td>  {x.answer}</td>
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



export default Job2soln