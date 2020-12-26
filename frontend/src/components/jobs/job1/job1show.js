import axios from 'axios';
import '../job.css';
import React, {Component} from 'react';

class Job1page extends Component{
    constructor(props)
    {   super(props);
         this.state={
            job_id:props.location.state.id,
            job_img:props.location.state.img,
            job_title:props.location.state.title,
            job_descryption:props.location.state.description,
            }
         
        this.soln={
            job_id:props.location.state.id,
            user_id:window.localStorage.getItem('user_id'),
            answer:''
        }
    }

    handlesubmit(){
        axios.post('http://localhost:3001/savesoln1',this.soln)
        .then(()=>{this.props.history.push('/clientpage')})
    }

    render(){
        return(
            <div className="ShowJob">
                {/* <img src="/lhc.jpeg" id="bg-img"/> */}
                <div className="wrapper">
                <h4>Title: {this.state.job_title}</h4>
                <h4>Description:{this.state.job_descryption}</h4>
                <label>
                   <h4>Solution:</h4> 
                    <textarea id="input" onChange={event=>{this.soln.answer=event.target.value}} placeholder="Write your solution"></textarea>
                </label>
                <br></br>
                <button id="btn" onClick={event=>{this.handlesubmit()}}>Submit Job</button>
                
                
                
                </div>
                <img className="Image" src={'http://localhost:3001/getimage/'+this.state.job_img} height='500' width='400'></img>

            </div>
        )
    }
}

export default Job1page