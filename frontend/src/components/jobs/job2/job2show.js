import axios from 'axios';
import '../job.css';
import React, {Component} from 'react';

class Job2page extends Component{
    constructor(props)
    {   super(props);
         this.state={
            job_id:props.location.state.id,
            job_title:props.location.state.title,
            job_descryption:props.location.state.description,
            job_id:props.location.state.id,
            user_id:window.localStorage.getItem('user_id'),
            img:[]
            }
         
        
    }

    handlesubmit(){
        const data= new FormData()
        data.append('job_id',this.state.job_id)
        data.append('user_id',this.state.user_id)
        for(var i=0;i<this.state.img.length;i++)
        data.append('images',this.state.img[i])
        
        axios.post('http://localhost:3001/savesoln2',data)
        .then(()=>{this.props.history.push('/clientpage')})

    }
    handleEvent(event)
    {   
        var img=[]
        for(var i=0;i<event.target.files.length;i++)
        img.push(event.target.files[i])
        this.setState({img:img})
        
        
    }
    render(){
        return(
            <div className='ShowJob'>
                {/* <img src="/lhc.jpeg" id="bg-img"/> */}
                <div className="wrapper">
                <h4>Title: {this.state.job_title}</h4>
                <h4>Description: {this.state.job_descryption}</h4>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange = {(event)=>{this.handleEvent(event)}} multiple/>
                {console.log("img",this.state.img)}
                {console.log(this.state.img)}
                <ul>
                    {
                    this.state.img.map(x=><li>{x.name}</li>)
                    }   
                </ul>
                <button id="btn" onClick={event=>{this.handlesubmit()}}>Submit Job</button>
                </div>

            </div>
        )
    }
}

export default Job2page