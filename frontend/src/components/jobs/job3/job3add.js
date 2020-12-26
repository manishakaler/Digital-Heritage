import React, {Component} from 'react';
import axios from 'axios'


class Job3addpage extends Component{
    img_src=''
    state={
        img:null,
        description:String,
        title:String
    }


    handlesubmit(event)
    {
        console.log(this.state)
        const data=new FormData()
        data.append('user_id',window.localStorage.getItem('user_id'))
        data.append('title',this.state.title)
        data.append('description',this.state.description)
        data.append('jobtype','Add Annotation')
        data.append('image',this.state.img)
        const res=axios.post('http://localhost:3001/savejob1',data)
        .then(()=>this.props.history.push('/providerpage'))

        console.log(data)

    }

    render(){
        
        return(
            <div className="AddJob">
                {/* <img src="/lhc.jpeg" id="bg-img"/> */}
                <div className="wrapper">
                <h4>Add a Annotaion Job</h4>
                <label>
                    <h4>Title of Job</h4>
                <input type="text" value={this.state.title} onChange = {(event)=>{this.setState({title:event.target.value})}}/>
                </label>

                <label>
                   <h4> Description about the Annotation</h4>
                    
                     <textarea id="input" value={this.state.description} onChange = {(event)=>{this.setState({description:event.target.value})}} width="400" height="200"></textarea>
                </label>

                <label>
                    <h4>Upload the Image</h4>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange = {(event)=>{this.setState({img:event.target.files[0]})
                 if(event.target.files!=null)
                 this.img_src=URL.createObjectURL(event.target.files[0])}}/>
                </label>

                <label>
                    <h4>Submit</h4>
                    <button id="btn" on onClick={this.handlesubmit.bind(this)}>Post Job</button>
                </label>
                </div>

                <img className="Image" src={this.img_src} width="400" height="500"></img>
                
            </div>
        )
    }
}

export default Job3addpage;