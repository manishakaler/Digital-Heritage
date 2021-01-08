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
            
            this.props.history.push('/usercontact',{name:response.data.name,email:response.data.email,mob:response.data.number})
        })


    }

    download(){
        const fileData = JSON.stringify(this.state.job_soln);
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'annotation.txt';
        link.href = url;
        link.click();

    }

    render(){
        console.log(this.state.job_soln)
        if(this.state.job_soln.length){
            return(
                <div className="table-wrapper">

                <table className="fl-table">
                    <thead>
                        <th>Shape</th>
                        <th>Cordinates</th>
                        <th>User Details</th>
                    </thead>
                    
                    {this.state.job_soln.map(x=>
                    <tr> 
                    <td>{x.annotation.shape}</td>
                    <td>< button id="btn" onClick={()=>{this.promptdetails(x.user_id)}} >Client Details</button></td>
                    <td> <tr>X Cordinate = {x.annotation.x_cor.toString()} </tr><tr>Y Cordinate = {x.annotation.y_cor.toString()} </tr></td>
                   
                    </tr>)}
                </table>
                <button id="btn" onClick={()=>this.download()}>Download data</button>
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