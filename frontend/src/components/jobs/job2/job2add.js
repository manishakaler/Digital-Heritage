import React, {Component} from 'react';

import axios from 'axios'


class Job2addpage extends Component{
    img_src=''
    state={
        description:String,
        title:String,
        user_id:window.localStorage.getItem('user_id'),
        jobtype:'Add Images'
    }


    handlesubmit(event)
    {
        
        const res=axios.post('http://localhost:3001/savejob2',this.state)
        .then(()=>this.props.history.push('/providerpage'))

        

    }

    render(){
        
        return(
            <div className="AddJob">
                {/* <img src="/lhc.jpeg" id="bg-img"/> */}
                <div className="wrapper">
                <h4 >Add a Job</h4>
                <label>
                    <h4>Title</h4>
                <input type="text" value={this.state.title} onChange = {(event)=>{this.setState({title:event.target.value})}}/>
                </label>
                <label>
                    <h4>Give Description of Images that you want</h4>
                     <textarea id="input" value={this.state.description} onChange = {(event)=>{this.setState({description:event.target.value})}} width="400" height="200"></textarea>
                </label>
                <label>
                <h4>Submit</h4>
                    <button id="btn" on onClick={this.handlesubmit.bind(this)}>Post Job</button>
                </label>
                </div>
                
            </div>
        )
    }
}

export default Job2addpage;